import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateSupplement, Supplement } from './supplement.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupplementsService {
  private apiUrl = 'https://localhost:44306/api/supplements';
  private httpClient = inject(HttpClient);

  addSupplement(createSupplement: CreateSupplement) {
    return this.httpClient.post<CreateSupplement>(
      this.apiUrl,
      createSupplement
    );
  }

  removeSupplement(supplementId: number) {
    console.log('Removing product');
    return this.httpClient.delete(`${this.apiUrl}/${supplementId}`);
  }

  loadSupplement() {
    return this.fetchSupplement();
  }

  private fetchSupplement() {
    return this.httpClient.get<Supplement[]>(this.apiUrl).pipe(
      catchError((error) => {
        return throwError(() => new Error('Something went wrong.'));
      })
    );
  }
}
