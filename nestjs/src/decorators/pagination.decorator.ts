import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IPaginationParams } from 'dtos/pagination.dto';

export const Pagination = createParamDecorator((_, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();

    const paginationParams: IPaginationParams = {
        page: 1,
        limit: 10,
    };

    if (req.query?.page) {
        paginationParams.page = parseInt(req.query.page.toString())
    }

    if (req.query?.limit) {
        paginationParams.limit = parseInt(req.query.limit.toString())
    }


    return paginationParams;
});
