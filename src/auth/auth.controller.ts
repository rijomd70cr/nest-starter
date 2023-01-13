import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';

// types for data
import { Register, Payload } from '../interface/userInterface';

// service calling 
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService,

    ) { }

    @Post('register')
    async register(@Res() response: any, @Body() userData: Register) {
        try {
            const user = await this.userService.create(userData);
            const payload: Payload = {
                email: user.email,
            };
            return response.status(HttpStatus.CREATED).json({
                message: 'User has been created successfully',
                data: payload
            });;
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({ error })
        }

    }

    @Post('login')
    async login(@Res() response: any, @Body() loginData: Register) {
        try {
            await this.authService.login(loginData);
            return response.status(HttpStatus.CREATED).json({
                message: 'Authentication Success',
                data: {}
            });;
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({ error })
        }
    }

}
