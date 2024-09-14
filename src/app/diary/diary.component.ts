import { Component, DestroyRef, OnInit } from '@angular/core';
import { DiaryService } from './diary.service';
import { DailySum } from './models/dailySum.model';

@Component({
  selector: 'app-diary',
  standalone: true,
  imports: [],
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
  constructor(
    private diaryService: DiaryService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    const subscription = this.diaryService.loadDailySum().subscribe({
      next: (resData) => {
        this.dailySum = resData;
      },
      error: (error) => {
        console.error('Error fetching dailySum:', error);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
