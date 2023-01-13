import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { Register, User } from '../interface/userInterface';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>) { }

    // crreate user 
    async create(userData: Register) {
        try {
            const { email } = userData;
            const user = await this.userModel.findOne({ email });
            if (user) {
                throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
            } else {
                const saltOrRounds = 10;
                const salt = bcrypt.genSaltSync(saltOrRounds);
                const hash = bcrypt.hashSync(userData.password, salt);
                userData.password = hash;

                const createdUser = new this.userModel(userData);
                await createdUser.save()
                return createdUser;
            }
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST,)
        }
    }

    // find one item
    async findByLogin(emailId: string) {
        try {
            const user = await this.userModel.findOne({ email: emailId }).select('username password');
            return user;
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST,)
        }
    }

}
