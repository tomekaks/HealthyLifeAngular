import { Component, inject, OnInit } from '@angular/core';
import { DateControlsComponent } from '../date-controls/date-controls.component';
import { LoadingComponent } from '../../common/loading/loading.component';
import { WorkoutsTableComponent } from '../workouts-table/workouts-table.component';
import { DailyGoal } from '../models/dailyGoal.model';
import { DailySum } from '../models/dailySum.model';
import { DiaryService } from '../diary.service';
import { DailyTotalsTableComponent } from '../daily-totals-table/daily-totals-table.component';

@Component({
  selector: 'app-workouts-diary',
  standalone: true,
  imports: [
    DateControlsComponent,
    LoadingComponent,
    WorkoutsTableComponent,
    DailyTotalsTableComponent,
  ],
  templateUrl: './workouts-diary.component.html',
  styleUrl: './workouts-diary.component.css',
})
export class WorkoutsDiaryComponent implements OnInit {
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
  isUpdatingGoals = false;
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
