import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ROUTER_DRIVER } from 'configs/router';
import { Role } from 'constant';
import { IdFromToken } from 'decorators/id-from-token.decorator';
import { Pagination } from 'decorators/pagination.decorator';
import { Roles } from 'decorators/roles.decorator';
import { IPaginationParams, PaginationDataResponse } from 'dtos/pagination.dto';
import { DriverService } from './driver.service';
import { CreateDriverRequest, FilterDriverQuery, UpdateDriverByAdminRequest, UpdateDriverRequest } from './dto/driver-req.dto';
import { DriverResponse } from './dto/driver-res.dto';

@ApiTags('Driver')
@Controller(ROUTER_DRIVER)
export class DriverController {
    constructor(private readonly driverService: DriverService) { }

    @Roles(Role.ADMIN)
    @Get()
    getPerPage(@Pagination() paginationParams: IPaginationParams, @Query() query: FilterDriverQuery): Promise<PaginationDataResponse<DriverResponse>> {
        return this.driverService.getPerPage(paginationParams, query);
    }

    @Roles(Role.ADMIN)
    @Post('register')
    create(@Body() request: CreateDriverRequest): Promise<DriverResponse> {
        return this.driverService.create(request);
    }

    @Roles(Role.ADMIN)
    @Put(":id")
    update(@Param("id") id: string, @Body() request: UpdateDriverByAdminRequest): Promise<DriverResponse> {
        return this.driverService.update(id, request);
    }

    @Roles(Role.ADMIN)
    @Delete(":id")
    delete(@Param("id") id: string): Promise<void> {
        return this.driverService.delete(id);
    }

    @Get('me')
    getMyInfo(@IdFromToken() userId: string): Promise<DriverResponse> {
        return this.driverService.getById(userId);
    }

    @Put('me')
    updateMyInfo(@IdFromToken() userId: string, @Body() request: UpdateDriverRequest): Promise<DriverResponse> {
        return this.driverService.updateMyInfo(userId, request);
    }
}
