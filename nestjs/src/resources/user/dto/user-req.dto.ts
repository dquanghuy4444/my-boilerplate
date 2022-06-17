import { IsNotEmpty, IsOptional, Length } from "class-validator";

export class CreateUserRequest {
    @IsNotEmpty()
    @Length(1, 255)
    name: string;

    @IsNotEmpty()
    phoneNumber: string;

    @IsNotEmpty()
    @Length(1, 255)
    email: string;

    @IsNotEmpty()
    @Length(6, 20)
    password: string;

    @IsOptional()
    @Length(0, 255)
    referrer?: string;
}

export class UpdateUserRequest {
    @IsOptional()
    @Length(0, 255)
    name?: string;

    @IsOptional()
    @Length(0, 255)
    email?: string;
}
