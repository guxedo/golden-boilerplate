import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';

export enum Permission {
    VIEW_DASHBOARD = 'VIEW_DASHBOARD',
    MANAGE_USERS = 'MANAGE_USERS',
}

@Injectable()
export class PoliciesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredPermissions = this.reflector.get<Permission[]>('permissions', context.getHandler());
        if (!requiredPermissions) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();

        // Simple Role -> Permission Mapping strategy for demo
        if (user.role === Role.ADMIN) return true; // Admin has all permissions

        return requiredPermissions.every((permission) => this.hasPermission(user.role, permission));
    }

    private hasPermission(role: Role, permission: Permission): boolean {
        const permissions = {
            [Role.USER]: [Permission.VIEW_DASHBOARD],
            [Role.ADMIN]: Object.values(Permission),
        };
        return permissions[role]?.includes(permission);
    }
}
