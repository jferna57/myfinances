import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMonthYear } from '../month-year.model';

@Component({
  selector: 'jhi-month-year-detail',
  templateUrl: './month-year-detail.component.html',
})
export class MonthYearDetailComponent implements OnInit {
  monthYear: IMonthYear | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ monthYear }) => {
      this.monthYear = monthYear;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
