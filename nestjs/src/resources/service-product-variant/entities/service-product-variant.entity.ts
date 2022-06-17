import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ServiceProductStatus, ServiceProductVariantType } from 'constant';
import { IImage } from 'dtos/image.dto';
import { Document, Schema as mongooseSchema, Types } from 'mongoose';
import { ProductColor } from 'resources/product-color/entities/product-color.entity';
import { ProductMaterial } from 'resources/product-material/entities/product-material.entity';
import { ProductSize } from 'resources/product-size/entities/product-size.entity';

@Schema({ timestamps: true })
export class ServiceProductVariant extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    type: ServiceProductVariantType;

    @Prop({ required: true })
    images: IImage[]

    @Prop({ required: true, default: [] })
    productIds: string[];

    @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'ProductColor' })
    color: ProductColor | Types.ObjectId;

    @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'ProductMaterial' })
    material: ProductMaterial | Types.ObjectId;

    @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'ProductSize' })
    size: ProductSize | Types.ObjectId;

    @Prop({ required: true })
    serviceProductId: string;

    @Prop({ required: true })
    sku: string;

    @Prop({ required: true, default: ServiceProductStatus.ACTIVE })
    status: ServiceProductStatus;

    @Prop()
    updatedAt: Date;

    @Prop()
    createdAt: Date;
}

export const ServiceProductVariantSchema = SchemaFactory.createForClass(ServiceProductVariant);


