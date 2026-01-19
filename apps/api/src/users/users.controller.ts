import { Controller, Get, Patch, Param, Body, Query, UseGuards, ParseIntPipe, DefaultValuePipe, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PoliciesGuard, Permission } from '../casl/policies.guard';
import { CheckPermissions } from '../custom/permissions.decorator';
import { AuthGuard } from '../auth/auth.guard'; // Allows validating JWT
import { UserStatus } from '@prisma/client';

@Controller('users')
@UseGuards(AuthGuard, PoliciesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    @CheckPermissions(Permission.MANAGE_USERS)
    async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    ) {
        return this.usersService.findAll(page, limit);
    }

    @Patch('profile')
    async updateProfile(@Req() req, @Body() body: UpdateProfileDto) {
        return this.usersService.updateProfile(req.user.sub, body.name);
    }

    @Patch('password')
    async updatePassword(@Req() req, @Body() body: UpdatePasswordDto) {
        return this.usersService.updatePassword(req.user.sub, body);
    }

    @Patch(':id/status')
    @CheckPermissions(Permission.MANAGE_USERS)
    async updateStatus(
        @Param('id') id: string,
        @Body('status') status: UserStatus,
    ) {
        return this.usersService.updateStatus(id, status);
    }
}
