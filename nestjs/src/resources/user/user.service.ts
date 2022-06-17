/* eslint-disable @typescript-eslint/no-unsafe-call */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ERROR_MESSENGER_PHONE_NUMBER_EXISTS, ERROR_MESSENGER_USER_NOT_FOUND } from 'constant';
import { Model } from 'mongoose';
import { LoginRequest } from 'resources/auth/dto/auth-req.dto';
import { CreateUserRequest, UpdateUserRequest } from './dto/user-req.dto';
import { UserResponse } from './dto/user-res.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }

    async create(createUserRequest: CreateUserRequest): Promise<UserResponse> {
        const user = await this.userModel.findOne({ phoneNumber: createUserRequest.phoneNumber }).exec();

        if (user) {
            throw new BadRequestException(ERROR_MESSENGER_PHONE_NUMBER_EXISTS);
        }

        const info = await this.userModel.create(createUserRequest)
        return new UserResponse(info)
    }

    async getById(userId: string): Promise<UserResponse> {
        const user = await this.findById(userId)

        return new UserResponse(user)
    }

    async update(userId: string, updateUserRequest: UpdateUserRequest): Promise<UserResponse> {
        const user = await this.findById(userId)

        await user.update(updateUserRequest)

        return new UserResponse(user)
    }

    async getByAccount(loginRequest: LoginRequest): Promise<UserResponse> {
        const { phoneNumber, password } = loginRequest

        const user = await this.findByPhoneNumber(phoneNumber)

        await user.comparePassword(password);

        return new UserResponse(user)
    }

    async changePassword(phoneNumber: string, newPass: string, oldPassword = ""): Promise<void> {
        const user = await this.findByPhoneNumber(phoneNumber)

        if (oldPassword) {
            await user.comparePassword(oldPassword);
        }

        await user.updateOne({ password: newPass })
    }

    async findByPhoneNumber(phoneNumber: string): Promise<User> {
        const user = await this.userModel.findOne({ phoneNumber }).exec();
        if (!user) {
            throw new BadRequestException(ERROR_MESSENGER_USER_NOT_FOUND);
        }
        return user
    }

    async findById(id: string): Promise<User> {
        const user = await this.userModel.findById(id)
        if (!user) {
            throw new BadRequestException(ERROR_MESSENGER_USER_NOT_FOUND);
        }
        return user
    }

}
