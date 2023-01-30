import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { EntryFormService, EntryFormGroup } from './entry-form.service';
import { IEntry } from '../entry.model';
import { EntryService } from '../service/entry.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';
import { IMonthYear } from 'app/entities/month-year/month-year.model';
import { MonthYearService } from 'app/entities/month-year/service/month-year.service';

@Component({
  selector: 'jhi-entry-update',
  templateUrl: './entry-update.component.html',
})
export class EntryUpdateComponent implements OnInit {
  isSaving = false;
  entry: IEntry | null = null;

  usersSharedCollection: IUser[] = [];
  productsSharedCollection: IProduct[] = [];
  monthYearsSharedCollection: IMonthYear[] = [];

  editForm: EntryFormGroup = this.entryFormService.createEntryFormGroup();

  constructor(
    protected entryService: EntryService,
    protected entryFormService: EntryFormService,
    protected userService: UserService,
    protected productService: ProductService,
    protected monthYearService: MonthYearService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  compareProduct = (o1: IProduct | null, o2: IProduct | null): boolean => this.productService.compareProduct(o1, o2);

  compareMonthYear = (o1: IMonthYear | null, o2: IMonthYear | null): boolean => this.monthYearService.compareMonthYear(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entry }) => {
      this.entry = entry;
      if (entry) {
        this.updateForm(entry);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const entry = this.entryFormService.getEntry(this.editForm);
    if (entry.id !== null) {
      this.subscribeToSaveResponse(this.entryService.update(entry));
    } else {
      this.subscribeToSaveResponse(this.entryService.create(entry));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEntry>>): void {
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

  protected updateForm(entry: IEntry): void {
    this.entry = entry;
    this.entryFormService.resetForm(this.editForm, entry);

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, entry.user);
    this.productsSharedCollection = this.productService.addProductToCollectionIfMissing<IProduct>(
      this.productsSharedCollection,
      entry.product
    );
    this.monthYearsSharedCollection = this.monthYearService.addMonthYearToCollectionIfMissing<IMonthYear>(
      this.monthYearsSharedCollection,
      entry.monthYear
    );
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.entry?.user)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));

    this.productService
      .query()
      .pipe(map((res: HttpResponse<IProduct[]>) => res.body ?? []))
      .pipe(map((products: IProduct[]) => this.productService.addProductToCollectionIfMissing<IProduct>(products, this.entry?.product)))
      .subscribe((products: IProduct[]) => (this.productsSharedCollection = products));

    this.monthYearService
      .query()
      .pipe(map((res: HttpResponse<IMonthYear[]>) => res.body ?? []))
      .pipe(
        map((monthYears: IMonthYear[]) =>
          this.monthYearService.addMonthYearToCollectionIfMissing<IMonthYear>(monthYears, this.entry?.monthYear)
        )
      )
      .subscribe((monthYears: IMonthYear[]) => (this.monthYearsSharedCollection = monthYears));
  }
}
