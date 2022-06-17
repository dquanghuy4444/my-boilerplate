import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'resources/user/user.module';
import { DriverModule } from 'resources/driver/driver.module';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        UserModule,
        DriverModule
    ],
    exports: [AuthService]
})
export class AuthModule { }
