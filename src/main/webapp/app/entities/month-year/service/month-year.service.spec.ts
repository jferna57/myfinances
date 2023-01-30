import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMonthYear } from '../month-year.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../month-year.test-samples';

import { MonthYearService } from './month-year.service';

const requireRestSample: IMonthYear = {
  ...sampleWithRequiredData,
};

describe('MonthYear Service', () => {
  let service: MonthYearService;
  let httpMock: HttpTestingController;
  let expectedResult: IMonthYear | IMonthYear[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(MonthYearService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find('ABC').subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a MonthYear', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const monthYear = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(monthYear).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a MonthYear', () => {
      const monthYear = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(monthYear).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a MonthYear', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of MonthYear', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a MonthYear', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addMonthYearToCollectionIfMissing', () => {
      it('should add a MonthYear to an empty array', () => {
        const monthYear: IMonthYear = sampleWithRequiredData;
        expectedResult = service.addMonthYearToCollectionIfMissing([], monthYear);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(monthYear);
      });

      it('should not add a MonthYear to an array that contains it', () => {
        const monthYear: IMonthYear = sampleWithRequiredData;
        const monthYearCollection: IMonthYear[] = [
          {
            ...monthYear,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addMonthYearToCollectionIfMissing(monthYearCollection, monthYear);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a MonthYear to an array that doesn't contain it", () => {
        const monthYear: IMonthYear = sampleWithRequiredData;
        const monthYearCollection: IMonthYear[] = [sampleWithPartialData];
        expectedResult = service.addMonthYearToCollectionIfMissing(monthYearCollection, monthYear);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(monthYear);
      });

      it('should add only unique MonthYear to an array', () => {
        const monthYearArray: IMonthYear[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const monthYearCollection: IMonthYear[] = [sampleWithRequiredData];
        expectedResult = service.addMonthYearToCollectionIfMissing(monthYearCollection, ...monthYearArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const monthYear: IMonthYear = sampleWithRequiredData;
        const monthYear2: IMonthYear = sampleWithPartialData;
        expectedResult = service.addMonthYearToCollectionIfMissing([], monthYear, monthYear2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(monthYear);
        expect(expectedResult).toContain(monthYear2);
      });

      it('should accept null and undefined values', () => {
        const monthYear: IMonthYear = sampleWithRequiredData;
        expectedResult = service.addMonthYearToCollectionIfMissing([], null, monthYear, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(monthYear);
      });

      it('should return initial array if no MonthYear is added', () => {
        const monthYearCollection: IMonthYear[] = [sampleWithRequiredData];
        expectedResult = service.addMonthYearToCollectionIfMissing(monthYearCollection, undefined, null);
        expect(expectedResult).toEqual(monthYearCollection);
      });
    });

    describe('compareMonthYear', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareMonthYear(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.compareMonthYear(entity1, entity2);
        const compareResult2 = service.compareMonthYear(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'CBA' };

        const compareResult1 = service.compareMonthYear(entity1, entity2);
        const compareResult2 = service.compareMonthYear(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'ABC' };

        const compareResult1 = service.compareMonthYear(entity1, entity2);
        const compareResult2 = service.compareMonthYear(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
