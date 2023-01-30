import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../month-year.test-samples';

import { MonthYearFormService } from './month-year-form.service';

describe('MonthYear Form Service', () => {
  let service: MonthYearFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthYearFormService);
  });

  describe('Service methods', () => {
    describe('createMonthYearFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createMonthYearFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            month: expect.any(Object),
            year: expect.any(Object),
            user: expect.any(Object),
          })
        );
      });

      it('passing IMonthYear should create a new form with FormGroup', () => {
        const formGroup = service.createMonthYearFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            month: expect.any(Object),
            year: expect.any(Object),
            user: expect.any(Object),
          })
        );
      });
    });

    describe('getMonthYear', () => {
      it('should return NewMonthYear for default MonthYear initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createMonthYearFormGroup(sampleWithNewData);

        const monthYear = service.getMonthYear(formGroup) as any;

        expect(monthYear).toMatchObject(sampleWithNewData);
      });

      it('should return NewMonthYear for empty MonthYear initial value', () => {
        const formGroup = service.createMonthYearFormGroup();

        const monthYear = service.getMonthYear(formGroup) as any;

        expect(monthYear).toMatchObject({});
      });

      it('should return IMonthYear', () => {
        const formGroup = service.createMonthYearFormGroup(sampleWithRequiredData);

        const monthYear = service.getMonthYear(formGroup) as any;

        expect(monthYear).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IMonthYear should not enable id FormControl', () => {
        const formGroup = service.createMonthYearFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewMonthYear should disable id FormControl', () => {
        const formGroup = service.createMonthYearFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
