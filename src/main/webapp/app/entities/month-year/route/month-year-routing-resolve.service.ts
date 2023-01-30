import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMonthYear } from '../month-year.model';
import { MonthYearService } from '../service/month-year.service';

@Injectable({ providedIn: 'root' })
export class MonthYearRoutingResolveService implements Resolve<IMonthYear | null> {
  constructor(protected service: MonthYearService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMonthYear | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((monthYear: HttpResponse<IMonthYear>) => {
          if (monthYear.body) {
            return of(monthYear.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
