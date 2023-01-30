import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MonthYearComponent } from './list/month-year.component';
import { MonthYearDetailComponent } from './detail/month-year-detail.component';
import { MonthYearUpdateComponent } from './update/month-year-update.component';
import { MonthYearDeleteDialogComponent } from './delete/month-year-delete-dialog.component';
import { MonthYearRoutingModule } from './route/month-year-routing.module';

@NgModule({
  imports: [SharedModule, MonthYearRoutingModule],
  declarations: [MonthYearComponent, MonthYearDetailComponent, MonthYearUpdateComponent, MonthYearDeleteDialogComponent],
})
export class MonthYearModule {}
