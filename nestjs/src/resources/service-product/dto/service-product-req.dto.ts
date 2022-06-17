import { Type } from "class-transformer";
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, Length, ValidateNested } from "class-validator";
import { ServiceProductStatus, ServiceProductType } from "constant";
import { CreateServiceProductVariantRequest } from "resources/service-product-variant/dto/service-product-variant-req.dto";
import { ImageParams } from "dtos/image.dto";

export class CreateServiceProductRequest {
    @IsNotEmpty()
    @Length(0, 255)
    name: string;

    @IsNotEmpty()
    @IsEnum(ServiceProductType)
    type: ServiceProductType;

    @IsNotEmpty()
    brandId: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ImageParams)
    images?: ImageParams[];

    @IsOptional()
    @Length(0, 255)
    description?: string;

    @IsOptional()
    @Length(0, 255)
    description2?: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateServiceProductVariantRequest)
    variants?: CreateServiceProductVariantRequest[]
    
    @IsOptional()
    @IsEnum(ServiceProductStatus)
    status?: ServiceProductStatus;
}

export class UpdateServiceProductRequest {
    @IsOptional()
    @Length(0, 255)
    name?: string;

    @IsOptional()
    @IsEnum(ServiceProductType)
    type?: ServiceProductType;

    @IsOptional()
    brand?: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ImageParams)
    images?: ImageParams[];

    @IsOptional()
    @Length(0, 255)
    description?: string;

    @IsOptional()
    @Length(0, 255)
    description2?: string;

    @IsOptional()
    @IsEnum(ServiceProductStatus)
    status?: ServiceProductStatus;
}

export class FilterServiceProductQuery {
    @IsOptional()
    statuses?: string

    @IsOptional()
    types?: string

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    minPrice?: number

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    maxPrice?: number

    @IsOptional()
    colorGroupIds?: string

    @IsOptional()
    materialIds?: string

    @IsOptional()
    sizeIds?: string
}
