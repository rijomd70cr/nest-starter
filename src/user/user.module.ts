import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// SERVICES 
import { UserService } from './user.service';
// scehma
import { UserSchema } from '../schema/userSchema';
import { ExampleSchema } from '../schema/examplenestSchema';


@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }, { name: 'Example', schema: ExampleSchema }])],
    controllers: [],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule { }
