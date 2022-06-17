import { IsNotEmpty, Length } from 'class-validator';
import { CreateUserRequest } from 'resources/user/dto/user-req.dto';

export class LoginRequest {
    @IsNotEmpty()
    phoneNumber: string;

    @IsNotEmpty()
    @Length(6, 20)
    password: string;
}

export class RegisterRequest extends CreateUserRequest {
    @IsNotEmpty()
    firebaseToken: string;
}

export class ForgetPassRequest extends LoginRequest {
    @IsNotEmpty()
    firebaseToken: string;
}

export class ChangePasswordRequest {
    @IsNotEmpty()
    phoneNumber: string;

    @IsNotEmpty()
    @Length(6, 20)
    oldPassword: string;

    @IsNotEmpty()
    @Length(6, 20)
    newPassword: string;
}

export class ChangeDriverPasswordRequest {
    @IsNotEmpty()
    phoneNumber: string;

    @IsNotEmpty()
    @Length(6, 6)
    oldPassword: string;

    @IsNotEmpty()
    @Length(6, 6)
    newPassword: string;
}
