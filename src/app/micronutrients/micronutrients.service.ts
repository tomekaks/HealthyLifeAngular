import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  CreateMicronutrient,
  Micronutrient,
  UpdateMicronutrient,
} from './micronutrient.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MicronutrientsService {
  private apiUrl = 'https://localhost:44306/api/micronutrients';
  private httpClient = inject(HttpClient);

  fetchAll() {
    return this.httpClient.get<Micronutrient[]>(this.apiUrl).pipe(
      catchError((error) => {
        return throwError(() => new Error('Something went wrong.', error));
      })
    );
  }

  fetch(micronutrientId: number) {
    return this.httpClient
      .get<Micronutrient>(this.apiUrl + `/${micronutrientId}`)
      .pipe(
        catchError((error) => {
          return throwError(() => new Error('Something went wrong.', error));
        })
      );
  }

  add(createMicronutrient: CreateMicronutrient) {
    return this.httpClient.post<CreateMicronutrient>(
      this.apiUrl,
      createMicronutrient
    );
  }

  remove(micronutrientId: number) {
    return this.httpClient.delete(`${this.apiUrl}/${micronutrientId}`);
  }

  update(micronutrient: UpdateMicronutrient) {
    console.log(micronutrient);
    return this.httpClient.put<UpdateMicronutrient>(this.apiUrl, micronutrient);
  }
}
