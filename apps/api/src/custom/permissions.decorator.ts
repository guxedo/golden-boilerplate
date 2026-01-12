import { SetMetadata } from '@nestjs/common';
import { Permission } from '../casl/policies.guard';

export const CheckPermissions = (...permissions: Permission[]) => SetMetadata('permissions', permissions);
