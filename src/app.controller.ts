import { Body, Controller, Get, HttpStatus, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IsEmail, IsMobilePhone } from 'class-validator';
import { AppService } from './app.service';

class RecruitSubmissionDto {
  name: string;

  @IsMobilePhone('ko-KR')
  phone: string;

  @IsEmail()
  email: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UsePipes(new ValidationPipe({ enableDebugMessages: true }))
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: 1024*1024*100 }) // <= 100MB
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    ) file: Express.Multer.File, 
    @Body() body: RecruitSubmissionDto
  ): string {
    console.log(file);
    console.log(body);

    return "dummy"
  }
}
