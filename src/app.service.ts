import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import axios from 'axios';
import { HtmlToPdfResponse } from "./responses/html-to-pdf.response";

@Injectable()
export class AppService {
  async htmlToPdf(payload: HtmlToPdfResponse) {
    const response = await axios.post("https://zxvo1ut035.execute-api.us-east-2.amazonaws.com/default/ssr", {
      "projectId": payload.projectId,
      "period": payload.period
    });
    const htmlContent = response.data;
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.setContent(htmlContent);

      const pdf = await page.pdf({ path: 'test.pdf' });
      await browser.close();
      return pdf;
    } catch(err) {
      console.log("Some error happened: ", err);
    }
  }
}
