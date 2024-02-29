import { Roles } from './shared';

export type User = {
  _id: string;
  access_token: any;
  name: string;
  email: string;
  identifier_id: number;
  role: Roles;
  phone: string;
  verified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
};
