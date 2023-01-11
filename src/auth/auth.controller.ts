import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';

// types for data
import { Register, Payload, RegisterExample } from '../interface/userInterface';

// service calling 
import { UserService } from '../user/user.service';


@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
    ) { }

    @Post('register')
    async register(@Res() response: any, @Body() userData: Register) {
        try {
            const user = await this.userService.create(userData);
            const payload: Payload = {
                username: user.username,
                address: user.address,
            };
            return response.status(HttpStatus.CREATED).json({
                message: 'User has been created successfully',
                data: payload
            });;
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                message: 'Error: User not created!',
                error: error
            })
        }

    }

    @Post('registerExample')
    async registerExample(@Body() userData: RegisterExample) {
        const user = await this.userService.createExample(userData);
        const payload: RegisterExample = {
            name: user.name,
            roleNumber: user.roleNumber,
            class: user.class,
            gender: user.gender,
        };
        return payload;
    }

}
