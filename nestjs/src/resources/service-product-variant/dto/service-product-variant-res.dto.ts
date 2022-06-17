import { IImage } from "dtos/image.dto";
import { ServiceProductStatus, ServiceProductVariantType } from 'constant';
import { ServiceProductVariant } from "../entities/service-product-variant.entity";
import { ProductColorResponse } from "resources/product-color/dto/product-color-res.dto";
import { ProductMaterialResponse } from "resources/product-material/dto/product-material-res.dto";
import { ProductSizeResponse } from "resources/product-size/dto/product-size-res.dto";

export class ServiceProductVariantResponse {
    id: string;
    name: string;
    price: number;
    productIds: string[];
    type: ServiceProductVariantType;
    images: IImage[];
    status: ServiceProductStatus;
    color: ProductColorResponse;
    material: ProductMaterialResponse;
    size: ProductSizeResponse;
    serviceProductId: string;
    sku: string;
    updatedAt: Date;
    createdAt: Date;

    constructor(item: ServiceProductVariant) {
        this.id = item.id as string;
        this.name = item.name;
        this.price = item.price;
        this.productIds = item.productIds;
        this.type = item.type;
        this.images = item.images;
        this.status = item.status;
        this.serviceProductId = item.serviceProductId;
        this.sku = item.sku;
        this.updatedAt = item.updatedAt;
        this.createdAt = item.createdAt;
    }
}
