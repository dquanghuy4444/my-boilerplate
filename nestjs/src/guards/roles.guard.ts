
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'constant';
import { FastifyRequest } from 'fastify';
import { verify } from 'jsonwebtoken';
import { AuthService } from 'resources/auth/auth.service';

const SECRET_OR_PUBLIC_KEY = process.env["SECRET_OR_PUBLIC_KEY"] || "SECRET_OR_PUBLIC_KEY"

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, @Inject(AuthService) private readonly authService: AuthService) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }

        let token = context.switchToHttp().getRequest<FastifyRequest>().headers['x-auth-token'];

        if (!token) {
            throw new UnauthorizedException();
        }
        if (typeof token === 'object') {
            token = token[0] as string;
        }

        const data = verify(token, SECRET_OR_PUBLIC_KEY);

        if (typeof data === 'string') {
            throw new UnauthorizedException();
        }

        if (roles.every((role) => role !== data["role"])) {
            throw new ForbiddenException();
        }

        if (roles.some((role) => role === Role.DRIVER)) {
            await this.authService.authenticateDriver(data["id"])
        } else {
            await this.authService.authenticate(data["id"])
        }


        return true
    }
}
