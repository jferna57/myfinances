import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IMonthYear, NewMonthYear } from '../month-year.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMonthYear for edit and NewMonthYearFormGroupInput for create.
 */
type MonthYearFormGroupInput = IMonthYear | PartialWithRequiredKeyOf<NewMonthYear>;

type MonthYearFormDefaults = Pick<NewMonthYear, 'id'>;

type MonthYearFormGroupContent = {
  id: FormControl<IMonthYear['id'] | NewMonthYear['id']>;
  month: FormControl<IMonthYear['month']>;
  year: FormControl<IMonthYear['year']>;
  user: FormControl<IMonthYear['user']>;
};

export type MonthYearFormGroup = FormGroup<MonthYearFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MonthYearFormService {
  createMonthYearFormGroup(monthYear: MonthYearFormGroupInput = { id: null }): MonthYearFormGroup {
    const monthYearRawValue = {
      ...this.getFormDefaults(),
      ...monthYear,
    };
    return new FormGroup<MonthYearFormGroupContent>({
      id: new FormControl(
        { value: monthYearRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      month: new FormControl(monthYearRawValue.month, {
        validators: [Validators.required, Validators.min(1), Validators.max(12)],
      }),
      year: new FormControl(monthYearRawValue.year, {
        validators: [Validators.required, Validators.min(2000)],
      }),
      user: new FormControl(monthYearRawValue.user),
    });
  }

  getMonthYear(form: MonthYearFormGroup): IMonthYear | NewMonthYear {
    return form.getRawValue() as IMonthYear | NewMonthYear;
  }

  resetForm(form: MonthYearFormGroup, monthYear: MonthYearFormGroupInput): void {
    const monthYearRawValue = { ...this.getFormDefaults(), ...monthYear };
    form.reset(
      {
        ...monthYearRawValue,
        id: { value: monthYearRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): MonthYearFormDefaults {
    return {
      id: null,
    };
  }
}
