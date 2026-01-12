import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { PrismaClient, UserStatus } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

// Mock Prisma for simplicity in this file, normally injected via PrismaModule
const prisma = new PrismaClient();

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await prisma.user.findUnique({ where: { email } });

        // In real app: await bcrypt.compare(pass, user.password)
        if (user && user.password === pass) {

            // DOUBLE LOCK CHECK
            if (user.status !== UserStatus.ACTIVE) {
                throw new ForbiddenException('Account pending approval or disabled.');
            }

            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            sub: user.id,
            email: user.email,
            role: user.role,
        };
    }

    async register(data: any) {
        // Force PENDING status on registration
        return prisma.user.create({
            data: {
                ...data,
                status: UserStatus.PENDING,
            }
        });
    }
}
