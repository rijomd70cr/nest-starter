import { Module,Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// SERVICES 
import { UserService } from './user.service';
// scehma
import { UserSchema } from '../schema/userSchema';

@Global()
@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    controllers: [],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule { }
