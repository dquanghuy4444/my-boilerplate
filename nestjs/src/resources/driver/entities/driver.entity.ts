import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CallbackWithoutResultAndOptionalError, Document, HydratedDocument, Schema as mongooseSchema, Types } from 'mongoose';
import { IImage } from 'dtos/image.dto';
import { BankAccount } from './bank-account.entity';
import { DriverVehicle } from './driver-vehicle.entity';
import { DriverStatus, ERROR_MESSENGER_INVALID_PASSWORD, Gender } from 'constant';
import { compare, hash } from 'bcrypt';
import { BadRequestException } from '@nestjs/common';
import { IAddress } from 'dtos/address.dto';

@Schema({ timestamps: true })
export class Driver extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    phoneNumber: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true, default: '' })
    password: string;

    @Prop({ required: true })
    idCardNumber: string;

    @Prop({ required: true, default: 0 })
    balance: number;

    @Prop({ required: true, default: 0 })
    availableBalance: number;

    @Prop({ required: true, type: Array })
    profileImages: IImage[];

    @Prop({ required: true, type: Object })
    avatarImage: IImage;

    @Prop({ required: true, type: mongooseSchema.Types.ObjectId, ref: 'DriverVehicle' })
    vehicle: DriverVehicle | Types.ObjectId;

    @Prop({ required: true, type: mongooseSchema.Types.ObjectId, ref: 'BankAccount' })
    bankAccount: BankAccount | Types.ObjectId;

    @Prop({ required: true, default: DriverStatus.ACTIVE })
    status: DriverStatus;

    @Prop({ required: true, type: Object })
    address: IAddress;

    @Prop({ required: true })
    dob: string;

    @Prop({ required: true, default: Gender.MALE })
    gender: Gender;

    @Prop({ required: true, default: false })
    hasChangePassword: boolean;

    @Prop()
    referrer?: string;

    @Prop()
    updatedAt: Date;

    @Prop()
    createdAt: Date;

    comparePassword: (candidatePassword: string) => Promise<void>;
}

export const DriverSchema = SchemaFactory.createForClass(Driver);

DriverSchema.pre<Driver>("save", async function (this: Driver, next: CallbackWithoutResultAndOptionalError) {
    const password = this.get("password") as string
    const hashed = await hash(password, 10);
    this.set('password', hashed);

    next();
})

DriverSchema.pre<Driver>("updateOne", async function (this: any, next: CallbackWithoutResultAndOptionalError) {
    const update = this.getUpdate() as Driver
    if (update?.password) {
        const password = this.get("password") as string
        const hashed = await hash(password, 10);
        update.password = hashed;
    }

    next();
})


DriverSchema.methods['comparePassword'] = async function (candidatePassword: string) {
    const passwordValid = await compare(candidatePassword, this["password"]);

    if (!passwordValid) {
        throw new BadRequestException(ERROR_MESSENGER_INVALID_PASSWORD);
    }
};


