import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { ServiceProductService } from './service-product.service';
import { ServiceProductResponse } from './dto/service-product-res.dto';
import { CreateServiceProductRequest, FilterServiceProductQuery, UpdateServiceProductRequest } from './dto/service-product-req.dto';
import { ROUTER_SERVICE_PRODUCT } from 'configs/router';
import { PaginationDataResponse, IPaginationParams } from 'dtos/pagination.dto';
import { Pagination } from 'decorators/pagination.decorator';
import { Roles } from 'decorators/roles.decorator';
import { Role } from 'constant';

@Controller(ROUTER_SERVICE_PRODUCT)
export class ServiceProductController {
    constructor(private readonly serviceProductService: ServiceProductService) { }
    @Roles(Role.ADMIN, Role.USER)
    @Get()
    getPerPage(@Pagination() paginationParams: IPaginationParams, @Query() query: FilterServiceProductQuery): Promise<PaginationDataResponse<ServiceProductResponse>> {
        return this.serviceProductService.getPerPage(paginationParams, query);
    }

    @Roles(Role.ADMIN, Role.USER)
    @Get(":id")
    getDetail(@Param("id") id: string): Promise<ServiceProductResponse> {
        return this.serviceProductService.getDetail(id);
    }

    @Roles(Role.ADMIN)
    @Post()
    create(@Body() request: CreateServiceProductRequest): Promise<ServiceProductResponse> {
        return this.serviceProductService.create(request);
    }

    @Roles(Role.ADMIN)
    @Put(":id")
    update(@Param("id") id: string, @Body() request: UpdateServiceProductRequest): Promise<ServiceProductResponse> {
        return this.serviceProductService.update(id, request);
    }

    @Roles(Role.ADMIN)
    @Delete(":id")
    delete(@Param("id") id: string): Promise<void> {
        return this.serviceProductService.delete(id);
    }
}
