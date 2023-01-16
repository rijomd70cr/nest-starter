import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';

import { AuthService } from './auth.service';
import { RegisterDto } from './auth.dto';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }
    async validate(logindata: RegisterDto): Promise<any> {
        console.log(logindata,"logindata....")

        const user = await this.authService.validateUser(logindata);
        console.log(user,"user....")
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
