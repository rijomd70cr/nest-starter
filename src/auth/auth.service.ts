import { Injectable, Logger, Inject } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { RegisterDto } from './auth.dto';
import { IUser } from '../interface/userInterface';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService,) { }
    private readonly logger = new Logger(AuthService.name);

    @Inject(ConfigService)
    public config: ConfigService;

    async login(loginData: RegisterDto): Promise<IUser> {
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
                throw new NotFoundException(this.config.get('USER_NOT_EXIST'));
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
