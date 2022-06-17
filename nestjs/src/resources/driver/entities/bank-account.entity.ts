import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DriverStatus } from 'constant';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class BankAccount extends Document {
    @Prop({ required: true })
    bank: string;

    @Prop({ required: true })
    accountNumber: string;

    @Prop({ required: true, default: DriverStatus.INACTIVE })
    status: DriverStatus;

    @Prop()
    updatedAt: Date;

    @Prop()
    createdAt: Date;
}

export const BankAccountSchema = SchemaFactory.createForClass(BankAccount);


