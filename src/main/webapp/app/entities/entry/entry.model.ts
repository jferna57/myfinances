import dayjs from 'dayjs/esm';
import { IUser } from 'app/entities/user/user.model';
import { IProduct } from 'app/entities/product/product.model';
import { IMonthYear } from 'app/entities/month-year/month-year.model';

export interface IEntry {
  id: string;
  amount?: number | null;
  entryDate?: dayjs.Dayjs | null;
  user?: Pick<IUser, 'id'> | null;
  product?: Pick<IProduct, 'id' | 'name'> | null;
  monthYear?: Pick<IMonthYear, 'id' | 'month' | 'year'> | null;
}

export type NewEntry = Omit<IEntry, 'id'> & { id: null };
