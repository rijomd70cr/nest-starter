import { Module } from '@nestjs/common';
// modules
import { UserModule } from '../user/user.module';
// Controllers
import { AuthController } from './auth.controller';
// SERVICES 
import { AuthService } from './auth.service';

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }
