// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
import * as tencentcloud from 'tencentcloud-sdk-nodejs';
const OcrClient = tencentcloud.ocr.v20181119.Client;

// 实例化一个认证对象，入参需要传入腾讯云账户secretId，secretKey,此处还需注意密钥对的保密
// 密钥可前往https://console.cloud.tencent.com/cam/capi网站进行获取
const clientConfig = {
  credential: {
    secretId: 'AKIDPfjhaL0bEezNivGNLacQ0LUTElX9Yktq',
    secretKey: 'nNp8IZjlCWegjgQxMbihWFoQyNh2NXhh',
  },
  region: 'ap-beijing',
  profile: {
    httpProfile: {
      endpoint: 'ocr.tencentcloudapi.com',
    },
  },
};

// 实例化要请求产品的client对象,clientProfile是可选的
const client = new OcrClient(clientConfig);
// 识别pdf文字的方法
export async function pdfOrc(pdfUrl) {
  return new Promise((resolve,reject)=>{
    const params = {
      ImageUrl: pdfUrl,
      IsPdf: true,
    };
    resolve(client.GeneralFastOCR(params))
  })
}
