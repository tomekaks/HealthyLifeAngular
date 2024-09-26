import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { DailySum } from './models/dailySum.model';
import { CreateMealItem } from './models/mealItem.model';
import { CreateWorkout } from './models/workout.model';
import { DailyGoal } from './models/dailyGoal.model';

@Injectable({
  providedIn: 'root',
})
export class DiaryService {
  private httpClient = inject(HttpClient);
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

  private formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  //Daily sum

  fetchDailySum(date: Date) {
    const formatedDate = this.formatDate(date);
    return this.httpClient
      .get<DailySum>(this.apiUrl + `daily-sums/by-date/${formatedDate}`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching dailySum:', error);
          return throwError(() => new Error('Failed to load dailySum.'));
        })
      );
  }

  //Daily goal

  fetchDailyGoal() {
    return this.httpClient.get<DailyGoal>(this.apiUrl + 'daily-goals').pipe(
      catchError((error) => {
        console.error('Error fetching Daily goals:', error);
        return throwError(() => new Error('Failed to load Daily goals.'));
      })
    );
  }

  updateDailyGoal(dailyGoal: DailyGoal) {
    return this.httpClient
      .put<DailyGoal>(this.apiUrl + 'daily-goals', dailyGoal)
      .pipe(
        catchError((error) => {
          console.error('Error updating Daily goals:', error);
          return throwError(() => new Error('Failed to update Daily goals.'));
        })
      );
  }

  //Meal items

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

  //Workouts

  addWorkout(workout: CreateWorkout) {
    return this.httpClient
      .post<CreateWorkout>(this.apiUrl + 'workouts', workout)
      .pipe(
        catchError((error) => {
          console.error('Error adding workout:', error);
          return throwError(() => new Error('Failed to add workout.'));
        })
      );
  }

  removeWorkout(workoutId: number) {
    return this.httpClient.delete(this.apiUrl + `workouts/${workoutId}`).pipe(
      catchError((error) => {
        console.error('Error removing workout:', error);
        return throwError(() => new Error('Failed to remove workout.'));
      })
    );
  }
}
