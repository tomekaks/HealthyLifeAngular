import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { DailySum } from './models/dailySum.model';

@Injectable({
  providedIn: 'root',
})
export class DiaryService {
  private apiUrl = 'https://localhost:44306/api/';

  constructor(private httpClient: HttpClient) {}

  private formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  loadDailySum(): Observable<DailySum> {
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
}
