var HttpClient = require('baidu-aip-sdk').HttpClient;
var AipOcrClient = require('baidu-aip-sdk').ocr;

import * as fs from 'fs';
// 设置APPID/AK/SK
const APP_ID = '27581550';
const API_KEY = 'xspIEWsNcFKuUumjkvGbWAbi';
const SECRET_KEY = 'bgaEzvdTWGq0OIBBwEDWAQxpN73eelw3';

// 新建一个对象，建议只保存一个对象调用服务接口
const client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);

// 设置request库的一些参数，例如代理服务地址，超时时间等
// request参数请参考 https://github.com/request/request#requestoptions-callback
HttpClient.setRequestOptions({ timeout: 50000 });

// 也可以设置拦截每次请求（设置拦截后，调用的setRequestOptions设置的参数将不生效）,
// 可以按需修改request参数（无论是否修改，必须返回函数调用参数）
// request参数请参考 https://github.com/request/request#requestoptions-callback
HttpClient.setRequestInterceptor(function (requestOptions) {
  // 查看参数
  // 修改参数
  requestOptions.timeout = 50000;
  // 返回参数
  return requestOptions;
});
const options = {};
options['language_type'] = 'CHN_ENG';
options['detect_direction'] = 'true';
options['detect_language'] = 'true';
options['probability'] = 'true';
// 如果有可选参数
export function distinguishLocalImg(image) {
  return new Promise((resolve, reject) => {
    // 带参数调用通用文字识别, 图片参数为本地图片
    resolve(client.generalBasic(image, options));
  });
}
export function distinguishLinkImg(imageurl) {
  return new Promise((resolve, reject) => {
    // 带参数调用通用文字识别, 图片参数为本地图片
    resolve(client.generalBasicUrl(imageurl))
  });
}
