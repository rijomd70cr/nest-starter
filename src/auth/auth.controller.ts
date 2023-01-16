import { Controller, Post, Body, Res, HttpStatus, Req, Logger, HttpCode, Inject, UseGuards, Request } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// types for data
import { RegisterDto, PayloadDto } from './auth.dto';

// service calling 
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

// guards
import { LocalAuthGuard } from './local.auth.guard'

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService,

    ) { }
    private readonly logger = new Logger(AuthController.name);

    @Inject(ConfigService)
    public config: ConfigService;

    @Post('register')
    @HttpCode(204)
    async register(@Req() request: Object, @Res() response: any, @Body() userData: RegisterDto): Promise<JSON> {
        try {
            const user = await this.userService.createUser(userData);
            const payload: PayloadDto = {
                email: user.email,
            };
            return response.status(HttpStatus.CREATED).json({
                message: this.config.get("SUCCES_MESSAGE"),
                data: payload
            });;
        } catch (error) {
            this.logger.error(error);
            return response.status(HttpStatus.BAD_REQUEST).json({ error })
        }

    }

    // @UseGuards(LocalAuthGuard)
    // @Post('login')
    // @HttpCode(204)
    // async login(@Request() req: any, @Res() response: any, @Body() loginData: RegisterDto): Promise<JSON> {
    //     try {
    //         // await this.authService.login(loginData);
    //         return response.status(HttpStatus.OK).json({
    //             message: this.config.get("SUCCES_MESSAGE"),
    //             data: req.user
    //         })
    //         return req.user;
    //     } catch (error) {
    //         this.logger.error(error);
    //         return response.status(HttpStatus.BAD_REQUEST).json({ error: error, data: {} })
    //     }
    // }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req): any {
        return {
            User: req.user,
            msg: 'User logged in'
        };
    }

}
