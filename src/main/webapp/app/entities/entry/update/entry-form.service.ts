import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IEntry, NewEntry } from '../entry.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEntry for edit and NewEntryFormGroupInput for create.
 */
type EntryFormGroupInput = IEntry | PartialWithRequiredKeyOf<NewEntry>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IEntry | NewEntry> = Omit<T, 'entryDate'> & {
  entryDate?: string | null;
};

type EntryFormRawValue = FormValueOf<IEntry>;

type NewEntryFormRawValue = FormValueOf<NewEntry>;

type EntryFormDefaults = Pick<NewEntry, 'id' | 'entryDate'>;

type EntryFormGroupContent = {
  id: FormControl<EntryFormRawValue['id'] | NewEntry['id']>;
  amount: FormControl<EntryFormRawValue['amount']>;
  entryDate: FormControl<EntryFormRawValue['entryDate']>;
  user: FormControl<EntryFormRawValue['user']>;
  product: FormControl<EntryFormRawValue['product']>;
  monthYear: FormControl<EntryFormRawValue['monthYear']>;
};

export type EntryFormGroup = FormGroup<EntryFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EntryFormService {
  createEntryFormGroup(entry: EntryFormGroupInput = { id: null }): EntryFormGroup {
    const entryRawValue = this.convertEntryToEntryRawValue({
      ...this.getFormDefaults(),
      ...entry,
    });
    return new FormGroup<EntryFormGroupContent>({
      id: new FormControl(
        { value: entryRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      amount: new FormControl(entryRawValue.amount, {
        validators: [Validators.required, Validators.min(0)],
      }),
      entryDate: new FormControl(entryRawValue.entryDate, {
        validators: [Validators.required],
      }),
      user: new FormControl(entryRawValue.user),
      product: new FormControl(entryRawValue.product),
      monthYear: new FormControl(entryRawValue.monthYear),
    });
  }

  getEntry(form: EntryFormGroup): IEntry | NewEntry {
    return this.convertEntryRawValueToEntry(form.getRawValue() as EntryFormRawValue | NewEntryFormRawValue);
  }

  resetForm(form: EntryFormGroup, entry: EntryFormGroupInput): void {
    const entryRawValue = this.convertEntryToEntryRawValue({ ...this.getFormDefaults(), ...entry });
    form.reset(
      {
        ...entryRawValue,
        id: { value: entryRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EntryFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      entryDate: currentTime,
    };
  }

  private convertEntryRawValueToEntry(rawEntry: EntryFormRawValue | NewEntryFormRawValue): IEntry | NewEntry {
    return {
      ...rawEntry,
      entryDate: dayjs(rawEntry.entryDate, DATE_TIME_FORMAT),
    };
  }

  private convertEntryToEntryRawValue(
    entry: IEntry | (Partial<NewEntry> & EntryFormDefaults)
  ): EntryFormRawValue | PartialWithRequiredKeyOf<NewEntryFormRawValue> {
    return {
      ...entry,
      entryDate: entry.entryDate ? entry.entryDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
