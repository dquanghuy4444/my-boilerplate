import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { PaginationDataResponse, IPaginationParams } from 'dtos/pagination.dto';
import { ClientSession, Model } from 'mongoose';
import { ProductBrand } from 'resources/product-brand/entities/product-brand.entity';
import { CreateServiceProductRequest, FilterServiceProductQuery, UpdateServiceProductRequest } from './dto/service-product-req.dto';
import { ServiceProductResponse } from './dto/service-product-res.dto';
import { ServiceProduct } from './entities/service-product.entity';
import { ProductBrandResponse } from 'resources/product-brand/dto/product-brand-res.dto';
import { ServiceProductVariant } from 'resources/service-product-variant/entities/service-product-variant.entity';
import { ServiceProductVariantResponse } from 'resources/service-product-variant/dto/service-product-variant-res.dto';
import { ProductColor } from 'resources/product-color/entities/product-color.entity';
import { ProductColorResponse } from 'resources/product-color/dto/product-color-res.dto';
import { ProductMaterial } from 'resources/product-material/entities/product-material.entity';
import { ProductMaterialResponse } from 'resources/product-material/dto/product-material-res.dto';
import { ProductSize } from 'resources/product-size/entities/product-size.entity';
import { ProductSizeResponse } from 'resources/product-size/dto/product-size-res.dto';
import { ServiceProductVariantService } from 'resources/service-product-variant/service-product-variant.service';
import { CreateServiceProductVariantRequest } from 'resources/service-product-variant/dto/service-product-variant-req.dto';
import { Types } from 'mongoose';
import { COMMON_ERROR_MESSENGER, ERROR_MESSENGER_LOST_ITEM, ERROR_MESSENGER_PRODUCT_BRAND_NOT_FOUND, ServiceProductStatus } from 'constant';
import * as mongoose from 'mongoose';
import { withTransaction } from 'utils/with-transaction';
import { addPropertyToMatchByFilterString } from 'utils/add-property-to-match-by-filter-string';

class DetailServiceProductVariant extends ServiceProductVariant {
    detailColor: ProductColor
    detailMaterial: ProductMaterial
    detailSize: ProductSize
}
class DetailServiceProduct extends ServiceProduct {
    detailBrand: ProductBrand
    vars: DetailServiceProductVariant[]
}

@Injectable()
export class ServiceProductService {
    constructor(
        @InjectModel(ServiceProduct.name) private serviceProductModel: Model<ServiceProduct>,
        @InjectModel(ServiceProductVariant.name) private serviceProductVariantModel: Model<ServiceProductVariant>,
        @InjectModel(ProductBrand.name) private productBrandModel: Model<ProductBrand>,
        @InjectModel(ProductColor.name) private productColorModel: Model<ProductColor>,
        @Inject(ServiceProductVariantService) private readonly serviceProductVariantService: ServiceProductVariantService,

        @InjectConnection() private readonly connection: mongoose.Connection
    ) { }

    async getPerPage(paginationParams: IPaginationParams, query: FilterServiceProductQuery): Promise<PaginationDataResponse<ServiceProductResponse>> {
        const { page, limit } = paginationParams

        const {
            statuses,
            sizeIds,
            types,
            colorGroupIds,
            materialIds,
            minPrice,
            maxPrice
        } = query

        const match: mongoose.FilterQuery<ServiceProduct> = {}

        if (minPrice) {
            match.minPrice = {
                $gte: +minPrice
            }
        }

        if (maxPrice) {
            match.maxPrice = {
                $lte: +maxPrice
            }
        }

        addPropertyToMatchByFilterString(statuses, (arr: string[]) => {
            match.status = {
                $in: arr
            }
        })

        addPropertyToMatchByFilterString(types, (arr: string[]) => {
            match.type = {
                $in: arr
            }
        })

        addPropertyToMatchByFilterString(sizeIds, (arr: string[]) => {
            match.sizeIds = {
                $in: arr.map((id: string) => new Types.ObjectId(id))
            }
        })

        addPropertyToMatchByFilterString(materialIds, (arr: string[]) => {
            match.materialIds = {
                $in: arr.map((id: string) => new Types.ObjectId(id))
            }
        })


        const colorIds = colorGroupIds?.split(",")
        if (colorIds && colorIds.length > 0) {
            const colors = await this.productColorModel.find({ colorGroup: { $in: colorIds.map((id: string) => new Types.ObjectId(id)) } })
            match.colorIds = {
                $in: colors.map((color: ProductColor) => color._id as string)
            }
        }


        const total = await this.serviceProductModel.find(match).count();

        const items = await this.serviceProductModel.aggregate<DetailServiceProduct>([
            {
                $match: match
            },
            {
                $lookup: {
                    from: 'productbrands',
                    localField: 'brand',
                    foreignField: '_id',
                    as: 'detailBrand',
                },
            },
            {
                $unwind: {
                    path: "$detailBrand",
                    preserveNullAndEmptyArrays: true
                }
            },
            { $sort: { order: 1 } },
            { $skip: (page - 1) * limit },
            { $limit: limit }
        ])

        const result = items.map((i) => {
            const item = new ServiceProductResponse(i)
            item.id = i._id as string

            const brandTemp = i.detailBrand
            if (brandTemp) {
                item.brand = new ProductBrandResponse(brandTemp)
                item.brand.id = brandTemp._id as string
            }
            return item
        })

        return new PaginationDataResponse<ServiceProductResponse>(result, total, page, limit)
    }

    async getDetail(id: string): Promise<ServiceProductResponse> {
        const items = await this.serviceProductModel.aggregate<DetailServiceProduct>([
            {
                $match: {
                    _id: new Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: 'productbrands',
                    localField: 'brand',
                    foreignField: '_id',
                    as: 'detailBrand',
                },
            },
            {
                $unwind: {
                    path: "$detailBrand",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: { "_id": { "$toString": "$_id" } }
            },
            {
                $lookup: {
                    from: 'serviceproductvariants',
                    localField: '_id',
                    foreignField: 'serviceProductId',
                    as: 'vars',
                },
            },
            {
                $unwind: {
                    path: "$vars",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "productcolors",
                    let: { pid: "$vars.color" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$_id", { $toObjectId: "$$pid" }]
                                }
                            }
                        }
                    ],
                    as: "vars.detailColor",
                }
            },
            {
                $unwind: {
                    path: "$vars.detailColor",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "productmaterials",
                    let: { pid: "$vars.material" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$_id", { $toObjectId: "$$pid" }]
                                }
                            }
                        }
                    ],
                    as: "vars.detailMaterial",
                }
            },
            {
                $unwind: {
                    path: "$vars.detailMaterial",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "productsizes",
                    let: { pid: "$vars.size" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$_id", { $toObjectId: "$$pid" }]
                                }
                            }
                        }
                    ],
                    as: "vars.detailSize",
                }
            },
            {
                $unwind: {
                    path: "$vars.detailSize",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: "$_id",
                    name: { $first: "$name" },
                    price: { $first: "$price" },
                    type: { $first: "$type" },
                    description: { $first: "$description" },
                    description2: { $first: "$description2" },
                    detailBrand: { $first: "$detailBrand" },
                    minPrice: { $first: "$minPrice" },
                    maxPrice: { $first: "$maxPrice" },
                    images: { $first: "$images" },
                    status: { $first: "$status" },
                    vars: { $push: "$vars" }
                }
            }
        ])

        if (items.length === 0) {
            throw new BadRequestException(ERROR_MESSENGER_LOST_ITEM);
        }

        const item = items[0] as DetailServiceProduct

        const i = new ServiceProductResponse(item)
        i.id = item._id as string

        const brandTemp = item.detailBrand
        if (brandTemp) {
            i.brand = new ProductBrandResponse(brandTemp)
            i.brand.id = brandTemp._id as string
        }

        i.variants = item.vars.filter(v => v.status === ServiceProductStatus.ACTIVE).map((i) => {
            const temp = new ServiceProductVariantResponse(i)
            temp.id = i._id as string

            const colorTemp = i.detailColor
            if (colorTemp) {
                temp.color = new ProductColorResponse(colorTemp)
                temp.color.id = colorTemp._id as string
            }

            const materialTemp = i.detailMaterial
            if (materialTemp) {
                temp.material = new ProductMaterialResponse(materialTemp)
                temp.material.id = materialTemp._id as string
            }

            const sizeTemp = i.detailSize
            if (sizeTemp) {
                temp.size = new ProductSizeResponse(sizeTemp)
                temp.size.id = sizeTemp._id as string
            }

            return temp
        })

        return i
    }


    async create(request: CreateServiceProductRequest): Promise<ServiceProductResponse> {
        const brand = await this.productBrandModel.findById(request.brandId)
        if (!brand) {
            throw new BadRequestException(ERROR_MESSENGER_PRODUCT_BRAND_NOT_FOUND);
        }

        const result = await withTransaction<ServiceProduct>(this.connection, async (session: ClientSession) => {
            const info = await this.serviceProductModel.create([{
                ...request,
                brand: request.brandId,
            }], { session })

            if (info.length === 0 || !info[0]) {
                throw new BadRequestException(COMMON_ERROR_MESSENGER)
            }

            if (request?.variants && request.variants?.length > 0) {
                const serviceProductId = info[0]._id as string

                await Promise.all(request.variants.map(async (req: CreateServiceProductVariantRequest) => {
                    await this.serviceProductVariantService.createVariant({
                        ...req,
                        serviceProductId,
                    }, session)
                }))
            }
            return info[0]
        })

        return new ServiceProductResponse(result)
    }

    async update(id: string, request: UpdateServiceProductRequest): Promise<ServiceProductResponse> {
        if (request.brand) {
            const brand = await this.productBrandModel.findById(request.brand)
            if (!brand) {
                throw new BadRequestException(ERROR_MESSENGER_PRODUCT_BRAND_NOT_FOUND);
            }
        }

        const result = await withTransaction<ServiceProduct>(this.connection, async (session: ClientSession) => {
            const ps = await this.serviceProductModel.findByIdAndUpdate(id, request).session(session)

            if (!ps) {
                throw new BadRequestException(ERROR_MESSENGER_LOST_ITEM);
            }

            if (request.status && request.status !== ServiceProductStatus.DELETED) {
                await this.serviceProductVariantModel.updateMany({ serviceProductId: id }, { status: request.status }).session(session)
            }

            return ps
        })

        return new ServiceProductResponse(result)
    }

    async delete(id: string): Promise<void> {

        try {
            await withTransaction(this.connection, async (session: ClientSession) => {
                await this.serviceProductModel.findByIdAndUpdate(id, { status: ServiceProductStatus.DELETED }).session(session)

                await this.serviceProductVariantModel.updateMany({ serviceProductVariantModel: id }, { status: ServiceProductStatus.DELETED }).session(session)
            })

        } catch (error) {
            throw new BadRequestException(ERROR_MESSENGER_LOST_ITEM);
        }
    }
}
