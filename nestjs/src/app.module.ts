import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'resources/user/user.module';
import mongoose from 'mongoose';
import { ExceptionFormatter, ResponseFormatterInterceptor } from 'interceptors/response.interceptor';
import { AuthModule } from './resources/auth/auth.module';
import { FirebaseModule } from 'services/firebase/firebase.module';
import { RolesGuard } from 'guards/roles.guard';
import { DriverModule } from './resources/driver/driver.module';

mongoose.set('debug', true);

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),

        MongooseModule.forRoot(process.env['MONGODB_URL'] || '', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }),

        FirebaseModule.forRoot(),

        UserModule,

        AuthModule,

        DriverModule,
    ],
    providers: [
        { provide: APP_PIPE, useValue: new ValidationPipe({ transform: true }) },
        { provide: APP_INTERCEPTOR, useClass: ResponseFormatterInterceptor },
        { provide: APP_FILTER, useClass: ExceptionFormatter },
        { provide: APP_GUARD, useClass: RolesGuard, },
    ],
})
export class AppModule { }
