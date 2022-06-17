import { Controller, Post, Body, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ROUTER_AUTHEN, ROUTER_DRIVER } from 'configs/router';
import { AuthService } from './auth.service';
import { ChangeDriverPasswordRequest, ChangePasswordRequest, ForgetPassRequest, LoginRequest, RegisterRequest } from './dto/auth-req.dto';
import { LoginResponse } from './dto/auth-res.dto';

@ApiTags('Authentication')
@Controller(ROUTER_AUTHEN)
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    register(@Body() request: RegisterRequest): Promise<LoginResponse> {
        return this.authService.register(request);
    }

    @Post('login')
    login(@Body() request: LoginRequest): Promise<LoginResponse> {
        return this.authService.login(request);
    }

    @Put('change-password')
    changePassword(@Body() request: ChangePasswordRequest): Promise<void> {
        return this.authService.changePassword(request);
    }

    @Put('forget-password')
    forgetPassword(@Body() request: ForgetPassRequest): Promise<void> {
        return this.authService.forgetPassword(request);
    }

    @Post(`${ROUTER_DRIVER}/login`)
    loginDriver(@Body() request: LoginRequest): Promise<LoginResponse> {
        return this.authService.loginDriver(request);
    }

    @Put(`${ROUTER_DRIVER}/forget-password`)
    forgetDriverPassword(@Body() request: ForgetPassRequest): Promise<void> {
        return this.authService.forgetDriverPassword(request);
    }

    @Put(`${ROUTER_DRIVER}/change-password`)
    changeDriverPassword(@Body() request: ChangeDriverPasswordRequest): Promise<void> {
        return this.authService.changeDriverPassword(request);
    }
}
