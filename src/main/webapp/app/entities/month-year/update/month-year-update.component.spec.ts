import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { MonthYearFormService } from './month-year-form.service';
import { MonthYearService } from '../service/month-year.service';
import { IMonthYear } from '../month-year.model';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';

import { MonthYearUpdateComponent } from './month-year-update.component';

describe('MonthYear Management Update Component', () => {
  let comp: MonthYearUpdateComponent;
  let fixture: ComponentFixture<MonthYearUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let monthYearFormService: MonthYearFormService;
  let monthYearService: MonthYearService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [MonthYearUpdateComponent],
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
      .overrideTemplate(MonthYearUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MonthYearUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    monthYearFormService = TestBed.inject(MonthYearFormService);
    monthYearService = TestBed.inject(MonthYearService);
    userService = TestBed.inject(UserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call User query and add missing value', () => {
      const monthYear: IMonthYear = { id: 'CBA' };
      const user: IUser = { id: 'b71b2824-4c37-4a46-ab17-f6fccc75a934' };
      monthYear.user = user;

      const userCollection: IUser[] = [{ id: '19a57067-ec60-48fa-a91f-b2b83fb031ce' }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [user];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ monthYear });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(
        userCollection,
        ...additionalUsers.map(expect.objectContaining)
      );
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const monthYear: IMonthYear = { id: 'CBA' };
      const user: IUser = { id: '157fca25-1ea8-4e1c-ab72-5b13e792fc54' };
      monthYear.user = user;

      activatedRoute.data = of({ monthYear });
      comp.ngOnInit();

      expect(comp.usersSharedCollection).toContain(user);
      expect(comp.monthYear).toEqual(monthYear);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMonthYear>>();
      const monthYear = { id: 'ABC' };
      jest.spyOn(monthYearFormService, 'getMonthYear').mockReturnValue(monthYear);
      jest.spyOn(monthYearService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ monthYear });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: monthYear }));
      saveSubject.complete();

      // THEN
      expect(monthYearFormService.getMonthYear).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(monthYearService.update).toHaveBeenCalledWith(expect.objectContaining(monthYear));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMonthYear>>();
      const monthYear = { id: 'ABC' };
      jest.spyOn(monthYearFormService, 'getMonthYear').mockReturnValue({ id: null });
      jest.spyOn(monthYearService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ monthYear: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: monthYear }));
      saveSubject.complete();

      // THEN
      expect(monthYearFormService.getMonthYear).toHaveBeenCalled();
      expect(monthYearService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMonthYear>>();
      const monthYear = { id: 'ABC' };
      jest.spyOn(monthYearService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ monthYear });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(monthYearService.update).toHaveBeenCalled();
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
  });
});
