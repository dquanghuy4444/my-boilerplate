import { IImage } from "dtos/image.dto";
import { ServiceProductStatus, ServiceProductType } from 'constant';
import { ServiceProduct } from "../entities/service-product.entity";
import { ProductBrandResponse } from "resources/product-brand/dto/product-brand-res.dto";
import { ServiceProductVariantResponse } from "resources/service-product-variant/dto/service-product-variant-res.dto";

export class ServiceProductResponse {
    id: string;
    name: string;
    minPrice: number;
    maxPrice: number;
    type: ServiceProductType;
    images: IImage[];
    description?: string;
    description2?: string;
    status: ServiceProductStatus;
    brand: ProductBrandResponse;
    variants: ServiceProductVariantResponse[]
    updatedAt: Date;
    createdAt: Date;

    constructor(item: ServiceProduct) {
        this.id = item.id as string;
        this.name = item.name;
        this.minPrice = item.minPrice;
        this.maxPrice = item.maxPrice;
        this.images = item.images;
        this.type = item.type;
        this.status = item.status;
        this.variants = []
        this.updatedAt = item.updatedAt;
        this.createdAt = item.createdAt;

        if (item.description) {
            this.description = item.description;
        }

        if (item.description2) {
            this.description2 = item.description2;
        }
    }
}
