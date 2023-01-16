import { Module } from '@nestjs/common';
import { PassportModule } from "@nestjs/passport"
// modules
import { UserModule } from '../user/user.module';
// Controllers
import { AuthController } from './auth.controller';
// SERVICES 
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';


@Module({
    imports: [UserModule,PassportModule],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy],
})
export class AuthModule { }
