import { Body, Controller, Post, Request, Response, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ComparitionService, } from './comparition.service';
@Controller('comparition')
export class ComparitionController {
  constructor(private comparitionService: ComparitionService) {}
  @Post('formnewExcel')
  @UseInterceptors(FileInterceptor('file'))
  async formnewExcel(@UploadedFile() file,@Body() body) {
    // eslint-disable-next-line prefer-const
    let comparation_result = await this.comparitionService.comprationData(
      file.buffer,
      ['发票链接','签收单链接'],
    );
    let result = this.comparitionService.getResultFile(comparation_result,file.buffer,['发票链接','签收单链接'])
    return result;
  }
}
