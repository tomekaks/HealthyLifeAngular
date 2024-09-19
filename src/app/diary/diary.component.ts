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
  dailySum: DailySum = {
    id: 0,
    userId: '',
    date: '',
    calories: 0,
    proteins: 0,
    carbs: 0,
    fats: 0,
    fiber: 0,
    price: 0,
    caloriesBurned: 0,
    meals: [],
    workouts: [],
  };
  loadingInitial = false;
  constructor(private diaryService: DiaryService) {}

  ngOnInit(): void {
    this.loadingInitial = true;
    this.loadDailySum();
  }

  loadDailySum() {
    this.diaryService.fetchDailySum().subscribe({
      next: (resData) => {
        console.log(resData);
        this.dailySum = resData;
        this.loadingInitial = false;
      },
      error: (error) => {
        console.error('Error fetching dailySum:', error);
      },
    });
  }
}
