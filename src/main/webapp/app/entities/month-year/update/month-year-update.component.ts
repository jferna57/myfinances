import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { MonthYearFormService, MonthYearFormGroup } from './month-year-form.service';
import { IMonthYear } from '../month-year.model';
import { MonthYearService } from '../service/month-year.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';

@Component({
  selector: 'jhi-month-year-update',
  templateUrl: './month-year-update.component.html',
})
export class MonthYearUpdateComponent implements OnInit {
  isSaving = false;
  monthYear: IMonthYear | null = null;

  usersSharedCollection: IUser[] = [];

  editForm: MonthYearFormGroup = this.monthYearFormService.createMonthYearFormGroup();

  constructor(
    protected monthYearService: MonthYearService,
    protected monthYearFormService: MonthYearFormService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ monthYear }) => {
      this.monthYear = monthYear;
      if (monthYear) {
        this.updateForm(monthYear);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const monthYear = this.monthYearFormService.getMonthYear(this.editForm);
    if (monthYear.id !== null) {
      this.subscribeToSaveResponse(this.monthYearService.update(monthYear));
    } else {
      this.subscribeToSaveResponse(this.monthYearService.create(monthYear));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMonthYear>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(monthYear: IMonthYear): void {
    this.monthYear = monthYear;
    this.monthYearFormService.resetForm(this.editForm, monthYear);

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, monthYear.user);
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.monthYear?.user)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }
}
