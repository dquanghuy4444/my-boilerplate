import { IsNotEmpty, Length } from "class-validator";

export interface IAddress {
    address: string;
    district: string;
    city: string;
}


export class AddressParams {
    @IsNotEmpty()
    @Length(1, 255)
    address: string;

    @IsNotEmpty()
    @Length(1, 255)
    district: string;

    @IsNotEmpty()
    @Length(1, 255)
    city: string;
}
