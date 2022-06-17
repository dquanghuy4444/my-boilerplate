import { Controller, Post, Body, Param, Delete, Put, Get } from '@nestjs/common';
import { ROUTER_SERVICE_PRODUCT_VARIANT } from 'configs/router';
import { Role } from 'constant';
import { Roles } from 'decorators/roles.decorator';
import { CreateServiceProductVariantRequest, UpdateServiceProductVariantRequest } from './dto/service-product-variant-req.dto';
import { ServiceProductVariantResponse } from './dto/service-product-variant-res.dto';
import { ServiceProductVariantService } from './service-product-variant.service';


@Controller(ROUTER_SERVICE_PRODUCT_VARIANT)
export class ServiceProductVariantController {
    constructor(private readonly serviceProductVariantService: ServiceProductVariantService) { }
    @Roles(Role.ADMIN)
    @Post()
    create(@Body() request: CreateServiceProductVariantRequest): Promise<ServiceProductVariantResponse> {
        return this.serviceProductVariantService.create(request);
    }

    @Roles(Role.ADMIN)
    @Put(":id")
    update(@Param("id") id: string, @Body() request: UpdateServiceProductVariantRequest): Promise<ServiceProductVariantResponse> {
        return this.serviceProductVariantService.update(id, request);
    }

    @Roles(Role.ADMIN)
    @Delete(":id")
    delete(@Param("id") id: string): Promise<void> {
        return this.serviceProductVariantService.delete(id);
    }
}
