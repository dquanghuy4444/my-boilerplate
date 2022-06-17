import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsDefined, IsEnum, IsInt, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, Length, ValidateNested } from "class-validator";
import { DriverVehicleType, Gender } from "constant";
import { AddressParams } from "dtos/address.dto";
import { ImageParams } from "dtos/image.dto";
export class CreateVehicleRequest {
    @IsNotEmpty()
    @Length(1, 255)
    name: string;

    @IsNotEmpty()
    @IsEnum(DriverVehicleType)
    type: DriverVehicleType;

    @IsNotEmpty()
    @Length(1, 255)
    model: string;

    @IsNotEmpty()
    @Length(1, 255)
    licensePlate: string;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(2)
    @Type(() => ImageParams)
    vehicleRegistrationImages: ImageParams[];
}

export class CreateBankAccountRequest {
    @IsNotEmpty()
    @Length(1, 255)
    bank: string;

    @IsNotEmpty()
    @Length(1, 255)
    accountNumber: string;
}

export class CreateDriverRequest {
    @IsNotEmpty()
    @Length(1, 255)
    name: string;

    @IsNotEmpty()
    phoneNumber: string;

    @IsNotEmpty()
    @Length(1, 255)
    email: string;

    @IsNotEmpty()
    @Length(1, 255)
    idCardNumber: string;

    @IsNotEmpty()
    @Length(1, 255)
    dob: string;

    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => AddressParams)
    address: AddressParams;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(2)
    @Type(() => ImageParams)
    profileImages: ImageParams[];

    @IsNotEmpty()
    @IsObject()
    @Type(() => ImageParams)
    avatarImage: ImageParams;

    @IsNotEmpty()
    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => CreateVehicleRequest)
    vehicle: CreateVehicleRequest;

    @IsNotEmpty()
    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => CreateBankAccountRequest)
    bankAccount: CreateBankAccountRequest;

    @IsOptional()
    referrer?: string;

    @IsOptional()
    @IsEnum(Gender)
    gender?: Gender;
}

export class UpdateDriverByAdminRequest {
    @IsOptional()
    @Length(1, 255)
    email?: string;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => ImageParams)
    avatarImage?: ImageParams;
}

export class UpdateDriverRequest {
    @IsOptional()
    @Length(1, 255)
    email?: string;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => ImageParams)
    avatarImage?: ImageParams;
}


export class FilterDriverQuery {
    @IsOptional()
    statuses?: string
}


