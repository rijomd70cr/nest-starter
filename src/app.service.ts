import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  @Inject(ConfigService)
  public config: ConfigService;

  public getHello(): string {
    const databaseName: string = this.config.get('USER_NOT_EXIST');

    return databaseName;
  }

}
