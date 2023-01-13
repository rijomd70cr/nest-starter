import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { Register } from '../interface/userInterface';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    async login(loginData: Register) {
        try {
            let user = await this.userService.findByLogin(loginData.email);
              if (user) {
                if (bcrypt.compareSync(loginData.password, user.password)) {
                    return user;
                }
                else {
                    throw new HttpException("Authentication failed", HttpStatus.BAD_REQUEST,)
                }
            }
            else {
                throw new HttpException("User not exist", HttpStatus.BAD_REQUEST,)
            }
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST,)
        }

    }

}
