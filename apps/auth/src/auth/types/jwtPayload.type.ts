import { Role } from '@swiped-in/shared';

export type JwtPayload = {
  email: string;
  sub: number;
  role: Role;
};
