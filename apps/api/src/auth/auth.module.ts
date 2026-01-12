import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PoliciesGuard } from '../casl/policies.guard';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET || 'secretKey', // In production use env vars
            signOptions: { expiresIn: '60s' },
        }),
    ],
    providers: [AuthService, PoliciesGuard],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule { }
