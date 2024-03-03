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

export type Unit = {
  _id: string;
  user_id: string;
  partnership_id: number;
  address: string;
  name_expense: string;
  // Identifier ID is used to identify the UNIT in TECO API
  unit_id: number;
  // Unidad Funcional
  unit: number;
  department: string;
  floor: string;
};

export type UnitFromTECO = {
  id: string;
  name: string;
  floor: string;
  department: string;
  unit: number;
};
