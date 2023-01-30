import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMonthYear } from '../month-year.model';
import { MonthYearService } from '../service/month-year.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './month-year-delete-dialog.component.html',
})
export class MonthYearDeleteDialogComponent {
  monthYear?: IMonthYear;

  constructor(protected monthYearService: MonthYearService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.monthYearService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
