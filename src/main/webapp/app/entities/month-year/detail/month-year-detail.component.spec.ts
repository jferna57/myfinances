import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MonthYearDetailComponent } from './month-year-detail.component';

describe('MonthYear Management Detail Component', () => {
  let comp: MonthYearDetailComponent;
  let fixture: ComponentFixture<MonthYearDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthYearDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ monthYear: { id: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(MonthYearDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(MonthYearDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load monthYear on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.monthYear).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });
});
