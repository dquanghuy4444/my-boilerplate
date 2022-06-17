import { Type } from "class-transformer";
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, Length, Min, ValidateNested } from "class-validator";
import { ServiceProductStatus, ServiceProductVariantType } from "constant";
import { ImageParams } from "dtos/image.dto";

export class CreateServiceProductVariantRequest {
    @IsNotEmpty()
    @Length(0, 255)
    name: string;

    @IsNotEmpty()
    @IsEnum(ServiceProductVariantType)
    type: ServiceProductVariantType;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    price: number;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ImageParams)
    images?: ImageParams[];

    @IsOptional()
    productIds?: string[];

    @IsNotEmpty()
    colorId: string;

    @IsNotEmpty()
    materialId: string;

    @IsNotEmpty()
    sizeId: string;

    @IsNotEmpty()
    serviceProductId: string;

    @IsNotEmpty()
    sku: string;

    @IsOptional()
    @IsEnum(ServiceProductStatus)
    status?: ServiceProductStatus;
}

export class UpdateServiceProductVariantRequest {
    @IsOptional()
    @Length(0, 255)
    name?: string;

    @IsOptional()
    @IsEnum(ServiceProductVariantType)
    type?: ServiceProductVariantType;

    @IsOptional()
    @Min(0)
    price?: number;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ImageParams)
    images?: ImageParams[];

    @IsOptional()
    productIds?: string[];

    @IsOptional()
    colorId?: string;

    @IsOptional()
    materialId?: string;

    @IsOptional()
    sizeId?: string;

    @IsOptional()
    sku?: string;

    @IsOptional()
    @IsEnum(ServiceProductStatus)
    status?: ServiceProductStatus;
}
