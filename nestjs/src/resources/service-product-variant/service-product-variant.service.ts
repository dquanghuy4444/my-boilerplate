import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { COMMON_ERROR_MESSENGER, ERROR_MESSENGER_LOST_ITEM, ERROR_MESSENGER_PRODUCT_COLOR_NOT_FOUND, ERROR_MESSENGER_PRODUCT_MATERIAL_NOT_FOUND, ERROR_MESSENGER_PRODUCT_SIZE_NOT_FOUND, ERROR_MESSENGER_SERVICE_PRODUCT_NOT_FOUND, ServiceProductStatus } from 'constant';
import mongoose, { ClientSession, Model, Types } from 'mongoose';
import { ProductColor } from 'resources/product-color/entities/product-color.entity';
import { ProductMaterial } from 'resources/product-material/entities/product-material.entity';
import { ProductSize } from 'resources/product-size/entities/product-size.entity';
import { ServiceProduct } from 'resources/service-product/entities/service-product.entity';
import { withTransaction } from 'utils/with-transaction';
import { CreateServiceProductVariantRequest, UpdateServiceProductVariantRequest } from './dto/service-product-variant-req.dto';
import { ServiceProductVariantResponse } from './dto/service-product-variant-res.dto';
import { ServiceProductVariant } from './entities/service-product-variant.entity';

@Injectable()
export class ServiceProductVariantService {
    constructor(
        @InjectModel(ServiceProductVariant.name) private serviceProductVariantModel: Model<ServiceProductVariant>,
        @InjectModel(ProductSize.name) private productSizeModel: Model<ProductSize>,
        @InjectModel(ProductColor.name) private productColorModel: Model<ProductColor>,
        @InjectModel(ProductMaterial.name) private productMaterialModel: Model<ProductMaterial>,
        @InjectModel(ServiceProduct.name) private serviceProductModel: Model<ServiceProduct>,
        @InjectConnection() private readonly connection: mongoose.Connection
    ) { }

    async createVariant(request: CreateServiceProductVariantRequest, session: ClientSession): Promise<ServiceProductVariant> {
        const serviceProduct = await this.serviceProductModel.findById(request.serviceProductId).session(session)
        if (!serviceProduct) {
            throw new BadRequestException(ERROR_MESSENGER_SERVICE_PRODUCT_NOT_FOUND);
        }

        const size = await this.productSizeModel.findById(request.sizeId)
        if (!size) {
            throw new BadRequestException(ERROR_MESSENGER_PRODUCT_SIZE_NOT_FOUND);
        }

        const color = await this.productColorModel.findById(request.colorId)
        if (!color) {
            throw new BadRequestException(ERROR_MESSENGER_PRODUCT_COLOR_NOT_FOUND);
        }

        const material = await this.productMaterialModel.findById(request.materialId)
        if (!material) {
            throw new BadRequestException(ERROR_MESSENGER_PRODUCT_MATERIAL_NOT_FOUND);
        }


        const variant = await this.serviceProductVariantModel.create([{
            ...request,
            color: request.colorId,
            material: request.materialId,
            size: request.sizeId,
        }], { session })
        await this.updateReferenceServiceProduct(request.serviceProductId, session)


        if (variant.length === 0 || !variant[0]) {
            throw new BadRequestException(COMMON_ERROR_MESSENGER)
        }

        return variant[0]
    }

    async create(request: CreateServiceProductVariantRequest): Promise<ServiceProductVariantResponse> {
        const result = await withTransaction<ServiceProductVariant>(this.connection, async (session: ClientSession) => {
            const result = await this.createVariant(request, session);

            return result
        })

        return new ServiceProductVariantResponse(result)
    }

    async update(id: string, request: UpdateServiceProductVariantRequest): Promise<ServiceProductVariantResponse> {
        const ps = await this.serviceProductVariantModel.findById(id)
        if (!ps) {
            throw new BadRequestException(ERROR_MESSENGER_LOST_ITEM);
        }


        if (request.sizeId) {
            const size = await this.productSizeModel.findById(request.sizeId)
            if (!size) {
                throw new BadRequestException(ERROR_MESSENGER_PRODUCT_SIZE_NOT_FOUND);
            }
        }

        if (request.colorId) {
            const color = await this.productColorModel.findById(request.colorId)
            if (!color) {
                throw new BadRequestException(ERROR_MESSENGER_PRODUCT_COLOR_NOT_FOUND);
            }
        }

        if (request.materialId) {
            const material = await this.productMaterialModel.findById(request.materialId)
            if (!material) {
                throw new BadRequestException(ERROR_MESSENGER_PRODUCT_MATERIAL_NOT_FOUND);
            }
        }
        const variant = await withTransaction<ServiceProductVariant>(this.connection, async (session: ClientSession) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const variant: ServiceProductVariant = await ps.update(request).session(session)

            await this.updateReferenceServiceProduct(ps.serviceProductId, session)

            return variant
        })

        return new ServiceProductVariantResponse(variant)
    }

    async delete(id: string): Promise<void> {
        const ps = await this.serviceProductVariantModel.findById(id)
        if (!ps) {
            throw new BadRequestException(ERROR_MESSENGER_LOST_ITEM);
        }

        await withTransaction(this.connection, async (session: ClientSession) => {
            await ps.update({ status: ServiceProductStatus.DELETED }).session(session)

            await this.updateReferenceServiceProduct(ps.serviceProductId, session)
        })
    }

    private filterDuplicateObjectId(list: Types.ObjectId[]): Types.ObjectId[] {
        const unique: Types.ObjectId[] = [];

        list.map((x: Types.ObjectId) => unique.filter(a => a.equals(x)).length > 0 ? null : unique.push(x));

        return unique
    }

    private async updateReferenceServiceProduct(serviceProductId: string, session: ClientSession): Promise<void> {
        const spVariants = await this.serviceProductVariantModel.find({ serviceProductId }).session(session)

        if (spVariants.length === 0) {
            return
        }

        const colorIds = this.filterDuplicateObjectId(spVariants.map((i) => i.color as Types.ObjectId))
        const materialIds = this.filterDuplicateObjectId(spVariants.map((i) => i.material as Types.ObjectId))
        const sizeIds = this.filterDuplicateObjectId(spVariants.map((i) => i.size as Types.ObjectId))
        const minPrice = Math.min.apply(spVariants, spVariants.map(i => i.price))
        const maxPrice = Math.max.apply(spVariants, spVariants.map(i => i.price))

        await this.serviceProductModel.findByIdAndUpdate(serviceProductId, {
            colorIds,
            materialIds,
            sizeIds,
            minPrice,
            maxPrice,
        }).session(session)
    }
}
