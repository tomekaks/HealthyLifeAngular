import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Register } from './models/register.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private httpClient = inject(HttpClient);
  private apiUrl = 'https://localhost:44306/api/authentication/';

  registerUser(register: Register) {
    return this.httpClient
      .post<Register>(this.apiUrl + 'register', register)
      .pipe(
        catchError((error) => {
          console.error('Error registering user:', error);
          return throwError(() => new Error('Failed to register user.'));
        })
      );
  }
}
