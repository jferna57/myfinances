import { Type } from 'app/entities/enumerations/type.model';

import { IProduct, NewProduct } from './product.model';

export const sampleWithRequiredData: IProduct = {
  id: 'c442dfc5-f1e3-4a23-b568-16f6b07dcadc',
  name: 'Account experiences Marroquinería',
  type: Type['BANK_ACCOUNT'],
  isActive: false,
};

export const sampleWithPartialData: IProduct = {
  id: 'e9cd2531-53fe-43a4-9b50-84beccd552ab',
  name: 'Ladrillo Multi calculate',
  type: Type['INVESTMENT_FOUND'],
  isActive: false,
};

export const sampleWithFullData: IProduct = {
  id: '76a4568a-63e8-45ba-bd43-5b43af8bb9bb',
  name: 'Cuentas generating Producto',
  type: Type['PENSION_SCHEME'],
  isActive: true,
};

export const sampleWithNewData: NewProduct = {
  name: 'Prolongación',
  type: Type['PENSION_SCHEME'],
  isActive: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
