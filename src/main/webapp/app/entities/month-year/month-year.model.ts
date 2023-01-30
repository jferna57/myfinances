import { IUser } from 'app/entities/user/user.model';

export interface IMonthYear {
  id: string;
  month?: number | null;
  year?: number | null;
  user?: Pick<IUser, 'id'> | null;
}

export type NewMonthYear = Omit<IMonthYear, 'id'> & { id: null };
