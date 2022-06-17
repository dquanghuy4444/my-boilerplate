import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ServiceProductStatus, ServiceProductType } from 'constant';
import { Document, Schema as mongooseSchema, Types } from 'mongoose';
import { ProductBrand } from 'resources/product-brand/entities/product-brand.entity';
import { IImage } from 'dtos/image.dto';

@Schema({ timestamps: true })
export class ServiceProduct extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, default: 0 })
    minPrice: number;

    @Prop({ required: true, default: 0 })
    maxPrice: number;

    @Prop({ required: true })
    type: ServiceProductType;

    @Prop({ required: true })
    images: IImage[]

    @Prop()
    description?: string;

    @Prop()
    description2?: string;

    @Prop({ default: [] })
    colorIds: string[];

    @Prop({ default: [] })
    materialIds: string[];

    @Prop({ default: [] })
    sizeIds: string[];

    @Prop({ required: true, type: mongooseSchema.Types.ObjectId, ref: 'ProductBrand' })
    brand: ProductBrand | Types.ObjectId;

    @Prop({ required: true, default: ServiceProductStatus.ACTIVE })
    status: ServiceProductStatus;

    @Prop()
    updatedAt: Date;

    @Prop()
    createdAt: Date;
}

export const ServiceProductSchema = SchemaFactory.createForClass(ServiceProduct);


