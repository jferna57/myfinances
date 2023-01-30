import { IUser } from 'app/entities/user/user.model';

export interface IBank {
  id: string;
  name?: string | null;
  user?: Pick<IUser, 'id'> | null;
}

export type NewBank = Omit<IBank, 'id' | 'name'> & { id: null };
