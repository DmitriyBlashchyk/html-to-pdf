import { Body, Controller, Get, Header, HttpStatus, Post, Res } from "@nestjs/common";
import { AppService } from './app.service';
import { Response } from 'express';
import { HtmlToPdfResponse } from "./responses/html-to-pdf.response";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename=test.pdf')
  async getHello(@Body() body: HtmlToPdfResponse, @Res() res: Response) {
    try {
      const pdf = await this.appService.htmlToPdf(body);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=test.pdf');
      res.status(HttpStatus.OK).send(pdf);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Failed to generate PDF!' });
    }
  }
}
