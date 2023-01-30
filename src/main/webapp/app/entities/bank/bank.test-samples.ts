import { IBank, NewBank } from './bank.model';

export const sampleWithRequiredData: IBank = {
  id: '6d599502-5117-4297-b868-58f86ce766e7',
  name: 'República Marca',
};

export const sampleWithPartialData: IBank = {
  id: 'da6359cc-9cc0-4040-b543-93350fba2741',
  name: 'Chad Iraqi',
};

export const sampleWithFullData: IBank = {
  id: '4722f768-9833-4c9c-9f15-bab9cc57cc53',
  name: 'Pequeño communities Zapatos',
};

export const sampleWithNewData: NewBank = {
  name: 'experiences Funcionario y',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
