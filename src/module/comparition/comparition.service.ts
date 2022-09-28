import { Injectable } from '@nestjs/common';
import { pdfOrc } from '../../utils/pdfOcrClient';
import { distinguishLinkImg } from '../../utils/apiOcrClient';
import {
  getXlsData,
  setNewXlsData,
  oringinXlsData,
} from '../../utils/xlsxHandle';
@Injectable()
export class ComparitionService {
  // 比对数据
  async comprationData(excelBuffer, options) {
    return new Promise((resolve, reject) => {
      let comparation_result = [];
      // 1. 获取excel有效数据
      const usefulData = getXlsData(excelBuffer, options);

      // 从任意一列开始循环
      Promise.all(
        usefulData[options[0]].map(async (item, index) => {
          return new Promise<void>(async (resolve, reject) => {
            // ocr识别pdf
            const pdfData: any = await pdfOrc(item);
            // ocr识别img
            const imgData: any = await distinguishLinkImg(
              usefulData[options[1]][index],
            );
            if (!imgData.words_result) {
              comparation_result.push('不相同');
              return null;
            }
            // 提取img关键信息
            const imgstr = imgData.words_result.find((item) => {
              return item.words.includes('电子发票');
            });
            // 提取pdf关键信息
            const pdfstr = pdfData.TextDetections.find((item) => {
              return item.DetectedText.includes('发票号码:');
            }).DetectedText.split(':')[1];
            if (!imgstr) {
              // 识别图片出错的情况下
              let tempStr = imgData.words_result.find((item) => {
                return item.words.includes(pdfstr);
              });
              if (!tempStr) {
                comparation_result.push('不相同');
              } else {
                comparation_result.push('相同');
              }
            } else {
              comparation_result.push(
                imgstr.words.includes(pdfstr) ? '相同' : '不相同',
              );
            }
            resolve();
          });
        }),
      ).then(() => {
        resolve(comparation_result)
      });
    });
  }
  getResultFile(comparation_result, excelBuffer, options) {
    console.log(comparation_result);
    // 添加比对列/*  */
    let newUseFulData = oringinXlsData(excelBuffer);
    newUseFulData[0].push('是否相同');
    newUseFulData.forEach((item, index) => {
      if (index > 0) {
        console.log(comparation_result[index]);
        item.push(comparation_result[index - 1]);
      }
    });
    return setNewXlsData(newUseFulData);
  }
}
