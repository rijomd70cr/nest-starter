import { Injectable, Logger, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import {  User } from '../interface/userInterface';
import { Register } from './user.dto';


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>) { }
    private readonly logger = new Logger(UserService.name);

    @Inject(ConfigService)
    public config: ConfigService;

    // crreate user 
    async create(userData: Register): Promise<any> {
        try {
            const { email } = userData;
            const user = await this.userModel.findOne({ email });
            if (user) {
                throw new Error(this.config.get('USER_NOT_EXIST'));
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
            this.logger.error(error);
            throw new Error(error);
        }
    }

    // find one item
    async findByLogin(emailId: string): Promise<any> {
        try {
            const user = await this.userModel.findOne({ email: emailId }).select('username password');
            return user;
        } catch (error) {
            this.logger.error(error);
            throw new Error(error);
        }
    }

}
