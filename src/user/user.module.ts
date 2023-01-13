import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// SERVICES 
import { UserService } from './user.service';
// scehma
import { UserSchema } from '../schema/userSchema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    controllers: [],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule { }
