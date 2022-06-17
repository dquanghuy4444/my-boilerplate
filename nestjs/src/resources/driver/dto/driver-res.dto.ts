import { DriverVehicleType, DriverStatus, Gender } from "constant";
import { IAddress } from "dtos/address.dto";
import { IImage } from "dtos/image.dto";
import { BankAccount } from "../entities/bank-account.entity";
import { DriverVehicle } from "../entities/driver-vehicle.entity";
import { Driver } from "../entities/driver.entity";

export class DriverResponse {
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
    idCardNumber: string;
    address: IAddress;
    dob: string;
    balance: number;
    availableBalance: number;
    profileImages: IImage[];
    vehicle: DriverVehicleResponse;
    bankAccount: BankAccountResponse;
    avatarImage: IImage;
    status: DriverStatus;
    hasChangePassword: boolean;
    referrer?: string;
    gender?: Gender;
    updatedAt: Date;
    createdAt: Date;

    constructor(item: Driver) {
        this.id = item.id as string;
        this.name = item.name;
        this.phoneNumber = item.phoneNumber;
        this.email = item.email;
        this.idCardNumber = item.idCardNumber;
        this.address = item.address;
        this.dob = item.dob;
        this.balance = item.balance;
        this.availableBalance = item.availableBalance;
        this.profileImages = item.profileImages;
        this.avatarImage = item.avatarImage;
        this.status = item.status;
        this.hasChangePassword = item.hasChangePassword;
        this.updatedAt = item.updatedAt;
        this.createdAt = item.createdAt;

        if (item.referrer) {
            this.referrer = item.referrer;
        }

        if (item.gender) {
            this.gender = item.gender;
        }
    }
}

export class DriverVehicleResponse {
    id: string;
    name: string;
    type: DriverVehicleType;
    model: string;
    licensePlate: string;
    vehicleRegistrationImages: IImage[];
    updatedAt: Date;
    createdAt: Date;

    constructor(item: DriverVehicle) {
        this.id = item.id as string;
        this.name = item.name;
        this.type = item.type;
        this.model = item.model;
        this.licensePlate = item.licensePlate;
        this.vehicleRegistrationImages = item.vehicleRegistrationImages;
        this.updatedAt = item.updatedAt;
        this.createdAt = item.createdAt;
    }
}

export class BankAccountResponse {
    id: string;
    bank: string;
    accountNumber: string;
    updatedAt: Date;
    createdAt: Date;

    constructor(item: BankAccount) {
        this.id = item.id as string;
        this.bank = item.bank;
        this.accountNumber = item.accountNumber;
        this.updatedAt = item.updatedAt;
        this.createdAt = item.createdAt;
    }
}


