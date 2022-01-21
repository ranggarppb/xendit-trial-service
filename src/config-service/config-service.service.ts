import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class ConfigService {
  public async get(): Promise<any> {
    const response = await fetch('http://localhost:8080/service/config');
    const config = await response.text();
    return config;
  }
}
