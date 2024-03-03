export enum Roles {
  ADMIN = 'admin',
  USER = 'user'
}

export enum EInputTypes {
  TEXT = 'text',
  NUMBER = 'number',
  DATE = 'date',
  SELECT = 'select',
  TEXT_AREA = 'textarea'
}

export type Partnership = {
  id: number;
  name: string;
  number: number;
  suterhcode: string;
  address: string;
  neighborhood: string;
  cuitnumber: string;
  comment: string | null;
  balance: number;
  previousbalance: number | null;
  lastprorateado: string | null;
  units: number;
  premises: number;
  parkingspaces: number;
  fee: number;
  period: string;
  roela: string;
  expense_a: number;
  expense_b: number;
  expense_c: number;
  expense_d: number;
  extraamount: number;
  extratype: string;
  expiration: string;
  deadline: string;
  user_id: number;
  created_at: string;
  updated_at: string;
};
