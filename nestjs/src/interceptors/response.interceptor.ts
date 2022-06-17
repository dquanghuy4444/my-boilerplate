import {
    ArgumentsHost,
    CallHandler,
    Catch,
    ExceptionFilter,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseFormatterInterceptor<T> implements NestInterceptor<T, unknown> {
    intercept(_: ExecutionContext, next: CallHandler<T>): Observable<unknown> {
        return next.handle().pipe(map((data) => ({ success: true, payload: data })));
    }
}

@Catch()
export class ExceptionFormatter implements ExceptionFilter {
    constructor(private httpAdapterHost: HttpAdapterHost) {}

    catch(exception: Error, host: ArgumentsHost): void {
        let statusCode: number, error: object;
        if (exception instanceof HttpException) {
            statusCode = exception.getStatus();
            const response = exception.getResponse();
            if (typeof response === 'string') {
                error = { statusCode, message: response };
            } else {
                error = response;
            }
        } else {
            statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            error = { statusCode, message: exception.message };
        }
        this.httpAdapterHost.httpAdapter.reply(
            host.switchToHttp().getResponse(),
            { success: false, error },
            statusCode,
        );
    }
}
