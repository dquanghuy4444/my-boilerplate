import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverVehicle, DriverVehicleSchema } from './entities/driver-vehicle.entity';
import { Driver, DriverSchema } from './entities/driver.entity';
import { BankAccount, BankAccountSchema } from './entities/bank-account.entity';

@Module({
    controllers: [DriverController],
    providers: [DriverService],
    imports: [
        MongooseModule.forFeature([
            { name: DriverVehicle.name, schema: DriverVehicleSchema },
        ]),
        MongooseModule.forFeature([
            { name: Driver.name, schema: DriverSchema },
        ]),
        MongooseModule.forFeature([
            { name: BankAccount.name, schema: BankAccountSchema },
        ])
    ],
    exports: [DriverService],
})
export class DriverModule { }
