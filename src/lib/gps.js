const toRadians = d => {
  return (d * Math.PI) / 180;
};

/**
 * 两个GPS点之间的距离
 * @param {Number} lat1 
 * @param {Number} lng1 
 * @param {Number} lat2 
 * @param {Number} lng2 
 */
export const gpsDistance = (lat1, lng1, lat2, lng2) => {
  if (lat1 == null || lat2 == null) {
    return null;
  }
  var radLat1 = toRadians(lat1);
  var radLat2 = toRadians(lat2);
  var deltaLat = radLat1 - radLat2;
  var deltaLng = toRadians(lng1) - toRadians(lng2);
  var dis =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(deltaLat / 2), 2) +
          Math.cos(radLat1) *
            Math.cos(radLat2) *
            Math.pow(Math.sin(deltaLng / 2), 2)
      )
    );
  return parseInt(dis * 6378137);
};

/**
 * 距离的人性化显示.1000米以下显示以米为单位显示,1000米以上精确到两位小数以千米为单位.如:900m,10.1km
 * @param {Number} distance 整数,单位为米.
 */
export const strDistance = distance => {
  if (distance == null) {
    return null;
  }
  let str = distance + 'm';
  if (distance > 1000) {
    str = Number(distance / 1000).toFixed(2) + 'km';
  }
  return str;
};

/**
 * 获取当前GPS位置(通过navigator.geolocation组件)
 */
export const currentLocation = () => {
  return new Promise((resolve, reject) => {
    let options = {
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: 0
    };

    let success = pos => {
      var crd = pos.coords;

      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      resolve({ lat: crd.latitude, lng: crd.longitude, acc: crd.accuracy });
    };

    let failure = err => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      reject(err);
    };

    navigator.geolocation.getCurrentPosition(success, failure, options);
  });
};
