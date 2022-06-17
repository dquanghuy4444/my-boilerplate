import { Controller, Get, Body, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { ROUTER_USER } from 'configs/router';
import { IdFromToken } from 'decorators/id-from-token.decorator';
import { UpdateUserRequest } from './dto/user-req.dto';
import { UserResponse } from './dto/user-res.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller(ROUTER_USER)
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get('me')
    getMyInfo(@IdFromToken() userId: string): Promise<UserResponse> {
        return this.userService.getById(userId);
    }

    @Put('me')
    updateMyInfo(@IdFromToken() userId: string, @Body() updateUserRequest: UpdateUserRequest): Promise<UserResponse> {
        return this.userService.update(userId, updateUserRequest);
    }
}
