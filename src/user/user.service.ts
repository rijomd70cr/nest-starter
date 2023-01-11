import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Register, User, Example, RegisterExample } from '../interface/userInterface';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>, @InjectModel('Example') private exampleModel: Model<Example>) { }

    async create(userData: Register) {
        try {
            const { username } = userData;
            const user = await this.userModel.findOne({ username });
            if (user) {
                throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
            } else {
                const createdUser = new this.userModel(userData);
                await createdUser.save()
                return createdUser;
            }
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST,)
        }
    }

    async createExample(userData: RegisterExample) {
        try {
            const { name } = userData;
            const user = await this.exampleModel.findOne({ name });
            if (user) {
                throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
            } else {
                const createdUser = new this.exampleModel(userData);
                await createdUser.save()
                return createdUser;
            }
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST,)
        }
    }


}
