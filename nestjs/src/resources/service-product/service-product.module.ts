import { Module } from '@nestjs/common';
import { ServiceProductService } from './service-product.service';
import { ServiceProductController } from './service-product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceProduct, ServiceProductSchema } from './entities/service-product.entity';
import { ServiceProductVariant, ServiceProductVariantSchema } from 'resources/service-product-variant/entities/service-product-variant.entity';
import { ProductBrand, ProductBrandSchema } from 'resources/product-brand/entities/product-brand.entity';
import { ServiceProductVariantModule } from 'resources/service-product-variant/service-product-variant.module';
import { ProductColor, ProductColorSchema } from 'resources/product-color/entities/product-color.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ServiceProduct.name, schema: ServiceProductSchema },
            { name: ServiceProductVariant.name, schema: ServiceProductVariantSchema },
            { name: ProductBrand.name, schema: ProductBrandSchema },
            { name: ProductColor.name, schema: ProductColorSchema },
        ]),
        ServiceProductVariantModule
    ],
    controllers: [ServiceProductController],
    providers: [ServiceProductService]
})
export class ServiceProductModule { }
