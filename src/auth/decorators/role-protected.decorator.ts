// role-protected.decorator.ts

import { SetMetadata } from '@nestjs/common';

export const META_ROLES = 'roles';

export const RoleProtected = (role: string) => SetMetadata(META_ROLES, role);
