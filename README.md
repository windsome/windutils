## 项目目标
此项目是一些工具函数的集合.

## 使用方法
```
// 首先安装windutils
yarn add windutils
// 加载所需组件,只引用所需要的js文件
import { loadMap } from 'windutils/lib/_request'; //加载request相关
import sleep from 'windutils/lib/sleep';
import rdebug from 'windutils/lib/remoteDebug';

// 在componentDidMount中加载js
doSleep() {
  sleep(2000).then (ret => {
    console.log ('after sleep');
  })
}
```

## 测试用例
例子请参考`src/App.js`,
```
git clone https://github.com/windsome/windutils
yarn install # npm install
npm start
```

## 方案介绍
1. `_request.js`HTTP请求的封装.
2. `loadScript.js`动态加载js/css文件
3. `sleep.js`sleep的快捷函数
10. 其他组件,有待添加.

## 注意事项
1. `loadScript.js`是用来加载js和css的,希望能确保加载文件的唯一性,可以参考requirejs的实现机制改掉.

## 反馈
We are always open to [your feedback](https://github.com/windsome/windutils/issues).

## 更新计划

## 团队协作
