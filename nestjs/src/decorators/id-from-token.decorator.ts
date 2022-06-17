import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { verify } from 'jsonwebtoken';

const SECRET_OR_PUBLIC_KEY = process.env["SECRET_OR_PUBLIC_KEY"] || "SECRET_OR_PUBLIC_KEY"

export const IdFromToken = createParamDecorator((_, context: ExecutionContext) => {
    let token = context.switchToHttp().getRequest<FastifyRequest>().headers['x-auth-token'];
    if (!token) {
        throw new UnauthorizedException();
    }
    if (typeof token === 'object') {
        token = token[0] as string;
    }

    try {
        const data = verify(token, SECRET_OR_PUBLIC_KEY);
        if (typeof data !== 'string') {
            return data['id'] as string;
        } else {
            return '';
        }
    } catch (error) {
        throw new UnauthorizedException();
    }
});
