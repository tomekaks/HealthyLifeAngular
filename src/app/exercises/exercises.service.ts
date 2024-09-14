import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Exercise, CreateExercise } from './exercise.model';

@Injectable({
  providedIn: 'root',
})
export class ExercisesService {
  private apiUrl = 'https://localhost:44306/api/exercises';

  constructor(private httpClient: HttpClient) {}

  addExercise(createExercise: CreateExercise): Observable<CreateExercise> {
    console.log('Adding exercise');
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

  loadExercises(): Observable<Exercise[]> {
    return this.fetchExercises();
  }

  private fetchExercises(): Observable<Exercise[]> {
    return this.httpClient.get<Exercise[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching exercises:', error);
        return throwError(() => new Error('Failed to load exercises.'));
      })
    );
  }
}
