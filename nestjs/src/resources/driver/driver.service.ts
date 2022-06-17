import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { COMMON_ERROR_MESSENGER, DriverStatus, ERROR_MESSENGER_DRIVER_NOT_FOUND, ERROR_MESSENGER_ID_CARD_NUMBER_EXISTS, ERROR_MESSENGER_PHONE_NUMBER_EXISTS } from 'constant';
import { IPaginationParams, PaginationDataResponse } from 'dtos/pagination.dto';
import mongoose, { ClientSession, Model } from 'mongoose';
import { LoginRequest } from 'resources/auth/dto/auth-req.dto';
import { sendMail } from 'services/send-mail';
import { addPropertyToMatchByFilterString } from 'utils/add-property-to-match-by-filter-string';
import { withTransaction } from 'utils/with-transaction';
import { CreateDriverRequest, FilterDriverQuery, UpdateDriverByAdminRequest, UpdateDriverRequest } from './dto/driver-req.dto';
import { BankAccountResponse, DriverResponse, DriverVehicleResponse } from './dto/driver-res.dto';
import { BankAccount } from './entities/bank-account.entity';
import { DriverVehicle } from './entities/driver-vehicle.entity';
import { Driver } from './entities/driver.entity';

@Injectable()
export class DriverService {
    constructor(
        @InjectModel(DriverVehicle.name) private driverVehicleModel: Model<DriverVehicle>,
        @InjectModel(Driver.name) private driverModel: Model<Driver>,
        @InjectModel(BankAccount.name) private bankAccountModel: Model<BankAccount>,

        @InjectConnection() private readonly connection: mongoose.Connection
    ) { }

    async getPerPage(paginationParams: IPaginationParams, query: FilterDriverQuery): Promise<PaginationDataResponse<DriverResponse>> {
        const { page, limit } = paginationParams

        const { statuses } = query

        const match: mongoose.FilterQuery<Driver> = {}

        addPropertyToMatchByFilterString(statuses, (arr: string[]) => {
            match.status = {
                $in: arr
            }
        })

        const items = await this.driverModel.find(match).sort({ created_at: -1 }).skip((page - 1) * limit).limit(limit);

        const total = await this.driverModel.count()

        return new PaginationDataResponse<DriverResponse>(items.map(item => new DriverResponse(item)), total, page, limit)
    }

    async getById(userId: string): Promise<DriverResponse> {
        const driver = await this.findById(userId)

        return new DriverResponse(driver)
    }

    async create(request: CreateDriverRequest): Promise<DriverResponse> {
        let driver = await this.driverModel.findOne({ phoneNumber: request.phoneNumber }).exec();
        if (driver) {
            throw new BadRequestException(ERROR_MESSENGER_PHONE_NUMBER_EXISTS);
        }

        driver = await this.driverModel.findOne({ idCardNumber: request.idCardNumber }).exec();
        if (driver) {
            throw new BadRequestException(ERROR_MESSENGER_ID_CARD_NUMBER_EXISTS);
        }

        const response = await withTransaction<DriverResponse>(this.connection, async (session: ClientSession) => {
            const vehicle = await this.driverVehicleModel.create([request.vehicle], { session })
            if (vehicle.length === 0 || !vehicle[0]) {
                throw new BadRequestException(COMMON_ERROR_MESSENGER)
            }
            const vehicleResponse = new DriverVehicleResponse(vehicle[0])

            const bankAccount = await this.bankAccountModel.create([request.bankAccount], { session })
            if (bankAccount.length === 0 || !bankAccount[0]) {
                throw new BadRequestException(COMMON_ERROR_MESSENGER)
            }
            const bankAccountResponse = new BankAccountResponse(bankAccount[0])

            const password = this.genaratePassword()

            const info = await this.driverModel.create([{
                ...request,
                password,
                vehicle: vehicleResponse.id,
                bankAccount: bankAccountResponse.id,
            }], { session })

            if (info.length === 0 || !info[0]) {
                throw new BadRequestException(COMMON_ERROR_MESSENGER)
            }
            const driver = info[0]

            const driverResponse = new DriverResponse(driver)

            driverResponse.vehicle = vehicleResponse
            driverResponse.bankAccount = bankAccountResponse

            await sendMail({
                phoneNumber: driverResponse.phoneNumber,
                password
            })

            return driverResponse
        })

        return response
    }

    async getByAccount(loginRequest: LoginRequest): Promise<DriverResponse> {
        const { phoneNumber, password } = loginRequest

        const driver = await this.findByPhoneNumber(phoneNumber)

        await driver.comparePassword(password);

        return new DriverResponse(driver)
    }

    async update(id: string, request: UpdateDriverByAdminRequest): Promise<DriverResponse> {
        const driver = await this.findById(id)

        await driver.update(request);

        return new DriverResponse(driver)
    }

    async updateMyInfo(userId: string, request: UpdateDriverRequest): Promise<DriverResponse> {
        const driver = await this.findById(userId)

        await driver.update(request);

        return new DriverResponse(driver)
    }

    async changePassword(phoneNumber: string, newPass: string, oldPassword = ""): Promise<void> {
        const driver = await this.findByPhoneNumber(phoneNumber)

        if (oldPassword) {
            await driver.comparePassword(oldPassword);
        }

        await driver.updateOne({ password: newPass, hasChangePassword: true })
    }

    async delete(id: string): Promise<void> {
        const driver = await this.findById(id)

        await withTransaction(this.connection, async (session: ClientSession) => {
            await this.bankAccountModel.findByIdAndUpdate(driver.bankAccount, { status: DriverStatus.DELETED }).session(session)
            await this.driverVehicleModel.findByIdAndUpdate(driver.vehicle, { status: DriverStatus.DELETED }).session(session)
            await this.driverModel.findByIdAndUpdate(id, { status: DriverStatus.DELETED }).session(session)
        })
    }

    async findById(id: string): Promise<Driver> {
        const driver = await this.driverModel.findById(id)
        if (!driver || driver.status !== DriverStatus.ACTIVE) {
            throw new BadRequestException(ERROR_MESSENGER_DRIVER_NOT_FOUND);
        }
        return driver
    }

    private async findByPhoneNumber(phoneNumber: string): Promise<Driver> {
        const driver = await this.driverModel.findOne({ phoneNumber }).exec();
        if (!driver || driver.status !== DriverStatus.ACTIVE) {
            throw new BadRequestException(ERROR_MESSENGER_DRIVER_NOT_FOUND);
        }
        return driver
    }

    private genaratePassword(): string {
        const min = 0
        const max = 999999
        const rand = Math.floor(Math.random() * (max - min)) + min
        const temp = `${rand}`
        return `${`0`.repeat(6 - temp.length)}${temp}`
    }
}
