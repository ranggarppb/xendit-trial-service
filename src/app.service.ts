import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class AppService {
  async getHello(): Promise<any> {
    const response = await fetch('http://localhost:8080/service/config');
    const body = await response.text();
    return body;
  }
}
