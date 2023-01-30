import { IUser } from 'app/entities/user/user.model';
import { IBank } from 'app/entities/bank/bank.model';
import { Type } from 'app/entities/enumerations/type.model';

export interface IProduct {
  id: string;
  name?: string | null;
  type?: Type | null;
  isActive?: boolean | null;
  user?: Pick<IUser, 'id'> | null;
  bank?: Pick<IBank, 'id' | 'name'> | null;
}

export type NewProduct = Omit<IProduct, 'id'> & { id: null };
