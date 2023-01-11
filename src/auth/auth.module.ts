import { Module } from '@nestjs/common';

// modules
import { UserModule } from '../user/user.module';
// Controllers
import { AuthController } from './auth.controller';
// SERVICES 

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [],
})
export class AuthModule { }
