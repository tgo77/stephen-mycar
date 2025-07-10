import { SetMetadata } from '@nestjs/common';
import { RoleType } from 'src/types/role-type';

export const Roles = (...roles: RoleType[]): any => {
  return SetMetadata('roles', roles);
};
