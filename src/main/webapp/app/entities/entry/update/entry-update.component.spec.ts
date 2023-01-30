import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EntryFormService } from './entry-form.service';
import { EntryService } from '../service/entry.service';
import { IEntry } from '../entry.model';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';
import { IMonthYear } from 'app/entities/month-year/month-year.model';
import { MonthYearService } from 'app/entities/month-year/service/month-year.service';

import { EntryUpdateComponent } from './entry-update.component';

describe('Entry Management Update Component', () => {
  let comp: EntryUpdateComponent;
  let fixture: ComponentFixture<EntryUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let entryFormService: EntryFormService;
  let entryService: EntryService;
  let userService: UserService;
  let productService: ProductService;
  let monthYearService: MonthYearService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EntryUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(EntryUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EntryUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    entryFormService = TestBed.inject(EntryFormService);
    entryService = TestBed.inject(EntryService);
    userService = TestBed.inject(UserService);
    productService = TestBed.inject(ProductService);
    monthYearService = TestBed.inject(MonthYearService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call User query and add missing value', () => {
      const entry: IEntry = { id: 'CBA' };
      const user: IUser = { id: '9df8e944-567c-43ab-96cc-1b500b813fac' };
      entry.user = user;

      const userCollection: IUser[] = [{ id: '0757e0bd-4372-49e9-b8c0-4da7fd0236ce' }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [user];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ entry });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(
        userCollection,
        ...additionalUsers.map(expect.objectContaining)
      );
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Product query and add missing value', () => {
      const entry: IEntry = { id: 'CBA' };
      const product: IProduct = { id: '6b58def9-3fe3-4971-bdcc-76ddf4b48b6e' };
      entry.product = product;

      const productCollection: IProduct[] = [{ id: '34350da5-6bb6-4dba-93ca-25fd83b9ed39' }];
      jest.spyOn(productService, 'query').mockReturnValue(of(new HttpResponse({ body: productCollection })));
      const additionalProducts = [product];
      const expectedCollection: IProduct[] = [...additionalProducts, ...productCollection];
      jest.spyOn(productService, 'addProductToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ entry });
      comp.ngOnInit();

      expect(productService.query).toHaveBeenCalled();
      expect(productService.addProductToCollectionIfMissing).toHaveBeenCalledWith(
        productCollection,
        ...additionalProducts.map(expect.objectContaining)
      );
      expect(comp.productsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call MonthYear query and add missing value', () => {
      const entry: IEntry = { id: 'CBA' };
      const monthYear: IMonthYear = { id: 'cbeefa00-1050-4e39-86b8-2bdad4b80d9c' };
      entry.monthYear = monthYear;

      const monthYearCollection: IMonthYear[] = [{ id: 'ec7fb036-0157-4d7b-a315-ff60f84756d6' }];
      jest.spyOn(monthYearService, 'query').mockReturnValue(of(new HttpResponse({ body: monthYearCollection })));
      const additionalMonthYears = [monthYear];
      const expectedCollection: IMonthYear[] = [...additionalMonthYears, ...monthYearCollection];
      jest.spyOn(monthYearService, 'addMonthYearToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ entry });
      comp.ngOnInit();

      expect(monthYearService.query).toHaveBeenCalled();
      expect(monthYearService.addMonthYearToCollectionIfMissing).toHaveBeenCalledWith(
        monthYearCollection,
        ...additionalMonthYears.map(expect.objectContaining)
      );
      expect(comp.monthYearsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const entry: IEntry = { id: 'CBA' };
      const user: IUser = { id: '11a7d11a-24e3-4940-ae31-f6b2eea7b623' };
      entry.user = user;
      const product: IProduct = { id: '3e0bc16a-7ce4-4925-93b5-61ac4b938179' };
      entry.product = product;
      const monthYear: IMonthYear = { id: '57dc7a32-481d-4952-b91a-90781dfa726a' };
      entry.monthYear = monthYear;

      activatedRoute.data = of({ entry });
      comp.ngOnInit();

      expect(comp.usersSharedCollection).toContain(user);
      expect(comp.productsSharedCollection).toContain(product);
      expect(comp.monthYearsSharedCollection).toContain(monthYear);
      expect(comp.entry).toEqual(entry);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntry>>();
      const entry = { id: 'ABC' };
      jest.spyOn(entryFormService, 'getEntry').mockReturnValue(entry);
      jest.spyOn(entryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entry });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: entry }));
      saveSubject.complete();

      // THEN
      expect(entryFormService.getEntry).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(entryService.update).toHaveBeenCalledWith(expect.objectContaining(entry));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntry>>();
      const entry = { id: 'ABC' };
      jest.spyOn(entryFormService, 'getEntry').mockReturnValue({ id: null });
      jest.spyOn(entryService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entry: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: entry }));
      saveSubject.complete();

      // THEN
      expect(entryFormService.getEntry).toHaveBeenCalled();
      expect(entryService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntry>>();
      const entry = { id: 'ABC' };
      jest.spyOn(entryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entry });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(entryService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareUser', () => {
      it('Should forward to userService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(userService, 'compareUser');
        comp.compareUser(entity, entity2);
        expect(userService.compareUser).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareProduct', () => {
      it('Should forward to productService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(productService, 'compareProduct');
        comp.compareProduct(entity, entity2);
        expect(productService.compareProduct).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareMonthYear', () => {
      it('Should forward to monthYearService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(monthYearService, 'compareMonthYear');
        comp.compareMonthYear(entity, entity2);
        expect(monthYearService.compareMonthYear).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
