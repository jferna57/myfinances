import { IMonthYear, NewMonthYear } from './month-year.model';

export const sampleWithRequiredData: IMonthYear = {
  id: 'cf503e50-0da2-4e49-9fb7-b81677ff86f0',
  month: 11,
  year: 3101,
};

export const sampleWithPartialData: IMonthYear = {
  id: '0ddf8569-8479-42ec-a21d-c8693f394e9a',
  month: 8,
  year: 7975,
};

export const sampleWithFullData: IMonthYear = {
  id: '74920db0-ca26-4e12-b48d-6c0e8e6e14f4',
  month: 1,
  year: 94662,
};

export const sampleWithNewData: NewMonthYear = {
  month: 6,
  year: 75834,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
