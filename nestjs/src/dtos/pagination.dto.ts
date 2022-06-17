export interface IPaginationParams {
    page: number;
    limit: number;
}

interface IPaginationResponse {
    total: number;
    limit: number;
    page: number;
    totalPages: number;
}


export class PaginationDataResponse<T> {
    data: T[];
    metadata: IPaginationResponse;

    constructor(data: T[], total: number, page: number, limit: number) {
        this.data = data;
        this.metadata = {
            total,
            limit,
            page,
            totalPages: Math.round(total / limit)
        }
    }
}

export class DefaultListDataResponse<T> {
    data: T[];

    constructor(data: T[]) {
        this.data = data;

    }
}
