import { Injectable, Logger, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { Register } from './auth.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService,) { }
    private readonly logger = new Logger(AuthService.name);

    @Inject(ConfigService)
    public config: ConfigService;

    async login(loginData: Register): Promise<any> {
        try {
            let user = await this.userService.findByLogin(loginData.email);
            if (user) {
                if (bcrypt.compareSync(loginData.password, user.password)) {
                    return user;
                }
                else {
                    throw new Error(this.config.get('AUTH_FAILED'));
                }
            }
            else {
                throw new Error(this.config.get('USER_NOT_EXIST'));
            }
        } catch (error) {
            this.logger.error(error);
            throw new Error(error);
            // throw new HttpException({
            //     status: HttpStatus.FORBIDDEN,
            //     error: 'This is a custom message',
            //   }, HttpStatus.FORBIDDEN, {
            //     cause: error
            //   });
        }

    }

}
