import { Controller, Post, Body, Res, HttpStatus, Req, Logger, HttpCode, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// types for data
import { RegisterDto, PayloadDto } from './auth.dto';

// service calling 
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';


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
            const user = await this.userService.create(userData);
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

    @Post('login')
    @HttpCode(204)
    async login(@Req() request: Object, @Res() response: any, @Body() loginData: RegisterDto): Promise<JSON> {
        try {
            await this.authService.login(loginData);
            return response.status(HttpStatus.OK).json({
                message: this.config.get("SUCCES_MESSAGE"),
                data: {}
            });;
        } catch (error) {
            this.logger.error(error);
            return response.status(HttpStatus.BAD_REQUEST).json({ error })
        }
    }

}
