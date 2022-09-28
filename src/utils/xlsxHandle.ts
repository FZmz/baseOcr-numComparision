import xlsx from 'node-xlsx';
import * as fs from 'fs';
import { join } from 'path';

export function getXlsData(xlsBuffer, options) {
  const workSheetsFromBuffer = xlsx.parse(xlsBuffer);
  const tableTitle: any = workSheetsFromBuffer[0].data[0];
  const tableDataItem = workSheetsFromBuffer[0].data.slice(1);
  const titleOption = options;
  const dataObj = {};
  titleOption.forEach((item) => {
    dataObj[item] = [];
    // 找到需要的列
    const index = tableTitle.findIndex((current) => {
      return item === current;
    });
    // 获取指定位置的数据
    tableDataItem.forEach((otherItem) => {
      dataObj[item].push(otherItem[index]);
    });
  });
  return dataObj;
}

export function setNewXlsData(xlsData) {
  var buffer = xlsx.build([{name: 'result', data: xlsData}]); // Returns a buffer
  fs.writeFileSync(join(__dirname, '../../', 'public/xlsx', `result.xlsx`),buffer);
  return 'http://localhost:3000/xlsx/result.xlsx';
}

export function oringinXlsData(xlsBuffer) {
  const workSheetsFromBuffer:any = xlsx.parse(xlsBuffer);
  return workSheetsFromBuffer[0].data;
}