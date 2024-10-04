import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Exercise, CreateExercise, UpdateExercise } from './exercise.model';

@Injectable({
  providedIn: 'root',
})
export class ExercisesService {
  private httpClient = inject(HttpClient);
  private apiUrl = 'https://localhost:44306/api/exercises';

  fetchExercises(): Observable<Exercise[]> {
    return this.httpClient.get<Exercise[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching exercises:', error);
        return throwError(() => new Error('Failed to load exercises.'));
      })
    );
  }

  fetchExercise(productId: number): Observable<Exercise> {
    return this.httpClient.get<Exercise>(this.apiUrl + `/${productId}`).pipe(
      catchError((error) => {
        console.error('Error fetching exercise:', error);
        return throwError(() => new Error('Failed to load exercise.'));
      })
    );
  }

  addExercise(createExercise: CreateExercise): Observable<CreateExercise> {
    return this.httpClient
      .post<CreateExercise>(this.apiUrl, createExercise)
      .pipe(
        catchError((error) => {
          console.error('Error adding exercise:', error);
          return throwError(() => new Error('Failed to add exercise.'));
        })
      );
  }

  removeExercise(exerciseId: number): Observable<void> {
    return this.httpClient.delete<void>(this.apiUrl + `/${exerciseId}`).pipe(
      catchError((error) => {
        console.error('Error removing exercise:', error);
        return throwError(() => new Error('Failed to remove exercise.'));
      })
    );
  }

  updateExercise(exercise: UpdateExercise) {
    return this.httpClient.put<UpdateExercise>(this.apiUrl, exercise).pipe(
      catchError((error) => {
        console.error('Error updating exercise:', error);
        return throwError(() => new Error('Failed to update exercise.'));
      })
    );
  }
}
