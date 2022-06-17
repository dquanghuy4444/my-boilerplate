import { Module } from '@nestjs/common';
import { ServiceProductVariantService } from './service-product-variant.service';
import { ServiceProductVariantController } from './service-product-variant.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceProductVariant, ServiceProductVariantSchema } from './entities/service-product-variant.entity';
import { ProductSize, ProductSizeSchema } from 'resources/product-size/entities/product-size.entity';
import { ProductMaterial, ProductMaterialSchema } from 'resources/product-material/entities/product-material.entity';
import { ProductColor, ProductColorSchema } from 'resources/product-color/entities/product-color.entity';
import { ServiceProduct, ServiceProductSchema } from 'resources/service-product/entities/service-product.entity';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ServiceProductVariant.name, schema: ServiceProductVariantSchema },
            { name: ProductSize.name, schema: ProductSizeSchema },
            { name: ProductMaterial.name, schema: ProductMaterialSchema },
            { name: ProductColor.name, schema: ProductColorSchema },
            { name: ServiceProduct.name, schema: ServiceProductSchema },

        ]),
    ],
    controllers: [ServiceProductVariantController],
    providers: [ServiceProductVariantService],
    exports: [ServiceProductVariantService]
})
export class ServiceProductVariantModule { }
