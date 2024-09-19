import { Component, input } from '@angular/core';
import { DailySum } from '../models/dailySum.model';
import { DailyGoal } from '../models/dailyGoal.model';

@Component({
  selector: 'app-daily-totals-table',
  standalone: true,
  imports: [],
  templateUrl: './daily-totals-table.component.html',
  styleUrl: './daily-totals-table.component.css',
})
export class DailyTotalsTableComponent {
  dailySum = input.required<DailySum>();
  dailyGoal = input.required<DailyGoal>();
}
