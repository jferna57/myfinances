import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MonthYearComponent } from '../list/month-year.component';
import { MonthYearDetailComponent } from '../detail/month-year-detail.component';
import { MonthYearUpdateComponent } from '../update/month-year-update.component';
import { MonthYearRoutingResolveService } from './month-year-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const monthYearRoute: Routes = [
  {
    path: '',
    component: MonthYearComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MonthYearDetailComponent,
    resolve: {
      monthYear: MonthYearRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MonthYearUpdateComponent,
    resolve: {
      monthYear: MonthYearRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MonthYearUpdateComponent,
    resolve: {
      monthYear: MonthYearRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(monthYearRoute)],
  exports: [RouterModule],
})
export class MonthYearRoutingModule {}
