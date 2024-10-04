import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  CreateSupplement,
  Supplement,
  UpdateSupplement,
} from './supplement.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupplementsService {
  private apiUrl = 'https://localhost:44306/api/supplements';
  private httpClient = inject(HttpClient);

  fetchSupplements() {
    return this.httpClient.get<Supplement[]>(this.apiUrl).pipe(
      catchError((error) => {
        return throwError(() => new Error('Something went wrong.', error));
      })
    );
  }

  fetchSupplement(supplementId: number) {
    return this.httpClient
      .get<Supplement>(this.apiUrl + `/${supplementId}`)
      .pipe(
        catchError((error) => {
          return throwError(() => new Error('Something went wrong.', error));
        })
      );
  }

  addSupplement(createSupplement: CreateSupplement) {
    return this.httpClient.post<CreateSupplement>(
      this.apiUrl,
      createSupplement
    );
  }

  removeSupplement(supplementId: number) {
    return this.httpClient.delete(`${this.apiUrl}/${supplementId}`);
  }

  updateSupplement(supplement: UpdateSupplement) {
    console.log(supplement);
    return this.httpClient.put<UpdateSupplement>(this.apiUrl, supplement);
  }
}
