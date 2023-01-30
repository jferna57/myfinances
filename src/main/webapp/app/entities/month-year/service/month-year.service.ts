import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMonthYear, NewMonthYear } from '../month-year.model';

export type PartialUpdateMonthYear = Partial<IMonthYear> & Pick<IMonthYear, 'id'>;

export type EntityResponseType = HttpResponse<IMonthYear>;
export type EntityArrayResponseType = HttpResponse<IMonthYear[]>;

@Injectable({ providedIn: 'root' })
export class MonthYearService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/month-years');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(monthYear: NewMonthYear): Observable<EntityResponseType> {
    return this.http.post<IMonthYear>(this.resourceUrl, monthYear, { observe: 'response' });
  }

  update(monthYear: IMonthYear): Observable<EntityResponseType> {
    return this.http.put<IMonthYear>(`${this.resourceUrl}/${this.getMonthYearIdentifier(monthYear)}`, monthYear, { observe: 'response' });
  }

  partialUpdate(monthYear: PartialUpdateMonthYear): Observable<EntityResponseType> {
    return this.http.patch<IMonthYear>(`${this.resourceUrl}/${this.getMonthYearIdentifier(monthYear)}`, monthYear, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IMonthYear>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMonthYear[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getMonthYearIdentifier(monthYear: Pick<IMonthYear, 'id'>): string {
    return monthYear.id;
  }

  compareMonthYear(o1: Pick<IMonthYear, 'id'> | null, o2: Pick<IMonthYear, 'id'> | null): boolean {
    return o1 && o2 ? this.getMonthYearIdentifier(o1) === this.getMonthYearIdentifier(o2) : o1 === o2;
  }

  addMonthYearToCollectionIfMissing<Type extends Pick<IMonthYear, 'id'>>(
    monthYearCollection: Type[],
    ...monthYearsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const monthYears: Type[] = monthYearsToCheck.filter(isPresent);
    if (monthYears.length > 0) {
      const monthYearCollectionIdentifiers = monthYearCollection.map(monthYearItem => this.getMonthYearIdentifier(monthYearItem)!);
      const monthYearsToAdd = monthYears.filter(monthYearItem => {
        const monthYearIdentifier = this.getMonthYearIdentifier(monthYearItem);
        if (monthYearCollectionIdentifiers.includes(monthYearIdentifier)) {
          return false;
        }
        monthYearCollectionIdentifiers.push(monthYearIdentifier);
        return true;
      });
      return [...monthYearsToAdd, ...monthYearCollection];
    }
    return monthYearCollection;
  }
}
