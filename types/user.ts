import { Roles } from './shared';

export type User = {
  access_token: any;
  name: string;
  email: string;
  identifier_id: number;
  role: Roles;
  phone: string;
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
};
