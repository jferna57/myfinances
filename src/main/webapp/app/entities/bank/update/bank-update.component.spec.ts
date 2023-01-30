import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { BankFormService } from './bank-form.service';
import { BankService } from '../service/bank.service';
import { IBank } from '../bank.model';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';

import { BankUpdateComponent } from './bank-update.component';

describe('Bank Management Update Component', () => {
  let comp: BankUpdateComponent;
  let fixture: ComponentFixture<BankUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let bankFormService: BankFormService;
  let bankService: BankService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [BankUpdateComponent],
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
      .overrideTemplate(BankUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BankUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    bankFormService = TestBed.inject(BankFormService);
    bankService = TestBed.inject(BankService);
    userService = TestBed.inject(UserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call User query and add missing value', () => {
      const bank: IBank = { id: 'CBA' };
      const user: IUser = { id: '6e5ee7aa-82c4-40ea-b082-e11f63df83d3' };
      bank.user = user;

      const userCollection: IUser[] = [{ id: '2fc576b8-48d9-42db-bd9c-4d5ae015abf6' }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [user];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ bank });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(
        userCollection,
        ...additionalUsers.map(expect.objectContaining)
      );
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const bank: IBank = { id: 'CBA' };
      const user: IUser = { id: '20403399-556c-4b02-b7c9-c3dd4e266780' };
      bank.user = user;

      activatedRoute.data = of({ bank });
      comp.ngOnInit();

      expect(comp.usersSharedCollection).toContain(user);
      expect(comp.bank).toEqual(bank);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBank>>();
      const bank = { id: 'ABC' };
      jest.spyOn(bankFormService, 'getBank').mockReturnValue(bank);
      jest.spyOn(bankService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bank });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: bank }));
      saveSubject.complete();

      // THEN
      expect(bankFormService.getBank).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(bankService.update).toHaveBeenCalledWith(expect.objectContaining(bank));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBank>>();
      const bank = { id: 'ABC' };
      jest.spyOn(bankFormService, 'getBank').mockReturnValue({ id: null });
      jest.spyOn(bankService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bank: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: bank }));
      saveSubject.complete();

      // THEN
      expect(bankFormService.getBank).toHaveBeenCalled();
      expect(bankService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBank>>();
      const bank = { id: 'ABC' };
      jest.spyOn(bankService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bank });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(bankService.update).toHaveBeenCalled();
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
