import { HttpClient } from '@angular/common/http';
import { DestroyRef, Injectable, signal } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { DailySum } from './models/dailySum.model';

@Injectable({
  providedIn: 'root',
})
export class DiaryService {
  private apiUrl = 'https://localhost:44306/api/';
  dailySum = signal<DailySum>({
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
  });

  constructor(private httpClient: HttpClient, private destroyRef: DestroyRef) {}

  private formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  loadDailySum(): void {
    const newDate = this.formatDate(new Date());
    const subscription = this.httpClient
      .get<DailySum>(this.apiUrl + `daily-sums/by-date/${newDate}`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching dailySum:', error);
          return throwError(() => new Error('Failed to load dailySum.'));
        })
      )
      .subscribe({
        next: (resData) => {
          this.dailySum.set(resData);
        },
        error: (error) => {
          console.error('Error fetching dailySyn:', error);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
