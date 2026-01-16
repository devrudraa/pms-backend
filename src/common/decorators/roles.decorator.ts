import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/modules/users/user.entity';

export const ROLES_KEY = 'roles';

/**
 * Usage:
 * @Roles(UserRole.TENANT, UserRole.LANDLORD)
 */
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
