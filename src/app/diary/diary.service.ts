import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { DailySum } from './models/dailySum.model';
import { CreateMealItem } from './models/mealItem.model';

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

  constructor(private httpClient: HttpClient) {}

  private formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  fetchDailySum() {
    const newDate = this.formatDate(new Date());
    return this.httpClient
      .get<DailySum>(this.apiUrl + `daily-sums/by-date/${newDate}`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching dailySum:', error);
          return throwError(() => new Error('Failed to load dailySum.'));
        })
      );
  }

  addMealItem(mealItem: CreateMealItem) {
    return this.httpClient
      .post<CreateMealItem>(this.apiUrl + 'meal-items', mealItem)
      .pipe(
        catchError((error) => {
          console.error('Error adding meal item:', error);
          return throwError(() => new Error('Failed to add meal item.'));
        })
      );
  }

  removeMealItem(itemId: number) {
    return this.httpClient.delete(this.apiUrl + `meal-items/${itemId}`).pipe(
      catchError((error) => {
        console.error('Error removing meal item:', error);
        return throwError(() => new Error('Failed to remove meal item.'));
      })
    );
  }
}
