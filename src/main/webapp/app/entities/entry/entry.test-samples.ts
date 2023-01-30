import dayjs from 'dayjs/esm';

import { IEntry, NewEntry } from './entry.model';

export const sampleWithRequiredData: IEntry = {
  id: 'a8db56e2-2685-4424-9bae-8f46242a90b2',
  amount: 37916,
  entryDate: dayjs('2023-01-28T13:48'),
};

export const sampleWithPartialData: IEntry = {
  id: '74ae336a-602c-4f97-bfaf-e4493a313b45',
  amount: 52686,
  entryDate: dayjs('2023-01-28T15:30'),
};

export const sampleWithFullData: IEntry = {
  id: '49cd5317-b196-4f59-b06d-3b4c4bb931a8',
  amount: 82909,
  entryDate: dayjs('2023-01-29T04:03'),
};

export const sampleWithNewData: NewEntry = {
  amount: 37998,
  entryDate: dayjs('2023-01-29T10:01'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
