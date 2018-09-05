import 'isomorphic-fetch';

/**
 * 通用网络请求函数,返回json,否则抛出异常
 * @param {String} method GET/POST/PUT/DELETE
 * @param {String} url 请求地址
 * @param {Object} data json数据,放在body中,当请求为GET/DELETE时,data无效
 * @param {Object} options 选项,默认为{ headers: { 'Content-Type': 'application/json' },credentials: true }
 * @returns {Object} 返回的json数据,错误则抛出错误
 */
export const request = (method, url, data = {}, options) => {
  if (!method) {
    console.log('error! method=null!');
  }
  if (!url) {
    console.log('error! url=null!');
  }

  let body = null;
  if (method === 'GET' || method === 'DELETE') {
    body = null;
  } else {
    body = JSON.stringify(data);
  }

  let { headers, credentials } = {
    headers: { 'Content-Type': 'application/json' },
    credentials: true,
    ...(options || {})
  };

  let opts = {
    method,
    headers: headers,
    body
  };
  if (credentials) {
    opts = {
      ...opts,
      credentials: 'include'
    };
  }
  console.log('request', url);
  return fetch(url, opts)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      if (response.status === 204) {
        throw new Error('没有数据');
      }
      return response;
    })
    .then(response => response.json());
  // .then(response => {
  //   let contentType = response.headers.get('content-type');
  //   //console.log ("contentType:", contentType);
  //   if (contentType.includes('application/json')) {
  //     return response.json();
  //   } else {
  //     console.log("Oops, we haven't got JSON!");
  //     return { errcode: -1, xContentType: contentType, xOrigData: response };
  //   }
  // })
  // .then(json => {
  //   if (!json.errcode) {
  //     return json;
  //   }
  //   throw json;
  // })
};

/**
 * POST请求的封装
 * @param {String} url 请求地址
 * @param {Object} data body数据
 */
export const requestPost = (url, data = {}) => {
  return request('POST', url, data);
};

/**
 * PUT请求的封装
 * @param {String} url 请求地址
 * @param {Object} data body数据
 */
export const requestPut = (url, data = {}) => {
  return request('PUT', url, data);
};

/**
 * GET请求的封装
 * @param {String} url 请求地址
 * @param {Object} options 选项,默认为{ headers: { 'Content-Type': 'application/json' },credentials: true }
 */
export const requestGet = (url, options) => {
  return request('GET', url, null, options);
};

/**
 * DELETE请求的封装
 * @param {String} url 请求地址
 */
export const requestDelete = url => {
  return request('DELETE', url);
};

export default request;
