import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'resources/user/user.service';
import { sign } from 'jsonwebtoken';
import { ChangeDriverPasswordRequest, ChangePasswordRequest, ForgetPassRequest, LoginRequest, RegisterRequest } from './dto/auth-req.dto';
import { LoginResponse } from './dto/auth-res.dto';
import { ERROR_MESSENGER_INVALID_PHONE_NUMBER, ERROR_MESSENGER_PASSWORD_SAME, Role, UserRole } from 'constant';
import { DriverService } from 'resources/driver/driver.service';
import { getPhoneNumberByToken } from 'services/firebase/get-phone-number-by-token';


const SECRET_OR_PUBLIC_KEY = process.env["SECRET_OR_PUBLIC_KEY"] || "SECRET_OR_PUBLIC_KEY"

@Injectable()
export class AuthService {
    constructor(
        @Inject(UserService) private readonly userService: UserService,
        @Inject(DriverService) private readonly driverService: DriverService,
    ) { }

    async register(registerRequest: RegisterRequest): Promise<LoginResponse> {
        await this.verifyPhoneNumberByFirebaseToken(registerRequest.firebaseToken, registerRequest.phoneNumber)

        const userResponse = await this.userService.create(registerRequest)

        const authToken = this.createToken(userResponse.id, userResponse.role);
        return new LoginResponse(authToken);
    }

    async login(loginRequest: LoginRequest): Promise<LoginResponse> {
        const userResponse = await this.userService.getByAccount(loginRequest)

        const authToken = this.createToken(userResponse.id, userResponse.role);

        return new LoginResponse(authToken);
    }


    async changePassword(changePasswordRequest: ChangePasswordRequest): Promise<void> {
        const { phoneNumber, oldPassword, newPassword } = changePasswordRequest;

        if (oldPassword === newPassword) {
            throw new BadRequestException(ERROR_MESSENGER_PASSWORD_SAME)
        }

        await this.userService.changePassword(phoneNumber, newPassword, oldPassword)

    }

    async forgetPassword(request: ForgetPassRequest): Promise<void> {
        const { phoneNumber, password, firebaseToken } = request;

        await this.verifyPhoneNumberByFirebaseToken(firebaseToken, phoneNumber)

        await this.userService.changePassword(phoneNumber, password)
    }

    async authenticate(id: string): Promise<void> {
        await this.userService.findById(id)
    }


    async authenticateDriver(id: string): Promise<void> {
        await this.driverService.findById(id)
    }

    async forgetDriverPassword(request: ForgetPassRequest): Promise<void> {
        const { phoneNumber, password, firebaseToken } = request;

        await this.verifyPhoneNumberByFirebaseToken(firebaseToken, phoneNumber)

        await this.driverService.changePassword(phoneNumber, password)
    }


    async loginDriver(loginRequest: LoginRequest): Promise<LoginResponse> {
        const driverResponse = await this.driverService.getByAccount(loginRequest)

        const authToken = this.createToken(driverResponse.id, Role.DRIVER);

        return new LoginResponse(authToken);
    }

    async changeDriverPassword(changePasswordRequest: ChangeDriverPasswordRequest): Promise<void> {
        const { phoneNumber, oldPassword, newPassword } = changePasswordRequest;

        if (oldPassword === newPassword) {
            throw new BadRequestException(ERROR_MESSENGER_PASSWORD_SAME)
        }

        await this.driverService.changePassword(phoneNumber, newPassword, oldPassword)
    }

    private createToken(userId: string, role: Role | UserRole): string {
        return sign(
            {
                id: userId,
                role
            },
            SECRET_OR_PUBLIC_KEY
        );
    }

    private async verifyPhoneNumberByFirebaseToken(token: string, phoneNumber: string) {
        const phone_number = await getPhoneNumberByToken(token)

        if (phone_number) {
            const temp = phone_number.replace("+84", "0")

            if (temp === phoneNumber) {
                return
            }
        }

        throw new BadRequestException(ERROR_MESSENGER_INVALID_PHONE_NUMBER);
    }
}
