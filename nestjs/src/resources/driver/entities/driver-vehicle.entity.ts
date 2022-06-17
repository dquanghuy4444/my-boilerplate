import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DriverStatus, DriverVehicleType } from 'constant';
import { Document } from 'mongoose';
import { IImage } from 'dtos/image.dto';

@Schema({ timestamps: true })
export class DriverVehicle extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, default: DriverVehicleType.MOTORBIKE })
    type: DriverVehicleType;

    @Prop({ required: true })
    model: string;

    @Prop({ required: true })
    licensePlate: string;

    @Prop({ required: true })
    vehicleRegistrationImages: IImage[];

    @Prop({ required: true, default: DriverStatus.INACTIVE })
    status: DriverStatus;

    @Prop()
    updatedAt: Date;

    @Prop()
    createdAt: Date;
}

export const DriverVehicleSchema = SchemaFactory.createForClass(DriverVehicle);


