import { Component, DestroyRef, effect, OnInit, signal } from '@angular/core';
import { DiaryService } from './diary.service';
import { DailySum } from './models/dailySum.model';
import { MealsTableComponent } from './meals-table/meals-table.component';
import { WorkoutsTableComponent } from './workouts-table/workouts-table.component';
import { DailyTotalsTableComponent } from './daily-totals-table/daily-totals-table.component';

@Component({
  selector: 'app-diary',
  standalone: true,
  imports: [
    MealsTableComponent,
    WorkoutsTableComponent,
    DailyTotalsTableComponent,
  ],
  templateUrl: './diary.component.html',
  styleUrl: './diary.component.css',
})
export class DiaryComponent implements OnInit {
  dailySum!: DailySum;
  loadingInitial = signal(true);
  constructor(private diaryService: DiaryService) {}

  ngOnInit(): void {
    console.log(this.loadingInitial());
    this.diaryService.loadDailySum();
    this.dailySum = this.diaryService.dailySum();

    this.loadingInitial.set(false);
  }
}
