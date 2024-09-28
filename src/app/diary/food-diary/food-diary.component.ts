import { Component, inject, OnInit } from '@angular/core';
import { LoadingComponent } from '../../common/loading/loading.component';
import { DateControlsComponent } from '../date-controls/date-controls.component';
import { DiaryService } from '../diary.service';
import { DailySum } from '../models/dailySum.model';
import { DailyGoal } from '../models/dailyGoal.model';
import { DailyTotalsTableComponent } from '../daily-totals-table/daily-totals-table.component';
import { MealsTableComponent } from './meals-table/meals-table.component';

@Component({
  selector: 'app-food-diary',
  standalone: true,
  imports: [
    LoadingComponent,
    DateControlsComponent,
    MealsTableComponent,
    DailyTotalsTableComponent,
  ],
  templateUrl: './food-diary.component.html',
  styleUrl: './food-diary.component.css',
})
export class FoodDiaryComponent implements OnInit {
  private diaryService = inject(DiaryService);
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
  dailyGoals: DailyGoal = {
    id: 0,
    userId: '',
    calories: 0,
    proteins: 0,
    carbs: 0,
    fats: 0,
    fiber: 0,
  };
  loadingInitial = false;
  todaysDate = new Date();

  ngOnInit(): void {
    this.loadingInitial = true;
    this.loadDailyGoal();
    this.loadDailySum(this.todaysDate);
  }

  loadDailySum(date: Date) {
    this.diaryService.fetchDailySum(date).subscribe({
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

  loadDailyGoal() {
    this.diaryService.fetchDailyGoal().subscribe({
      next: (resData) => {
        this.dailyGoals = resData;
      },
      error: (error) => {
        console.error('Error fetching dailyGoal:', error);
      },
    });
  }

  onDateChange(newDate: Date) {
    console.log(newDate);
    this.loadDailySum(newDate);
  }
}
