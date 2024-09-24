import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Register } from './models/register.model';
import { catchError, map, throwError } from 'rxjs';
import { Login } from './models/login.model';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private httpClient = inject(HttpClient);
  private apiUrl = 'https://localhost:44306/api/authentication/';
  currentUser = signal<User | null>(null);

  registerUser(register: Register) {
    return this.httpClient.post(this.apiUrl + 'register', register).pipe(
      catchError((error) => {
        console.error('Error registering user:', error);
        return throwError(() => new Error('Failed to register user.'));
      })
    );
  }

  loginUser(login: Login) {
    return this.httpClient.post<User>(this.apiUrl + 'login', login).pipe(
      map((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
          console.log(user);
        }
      }),
      catchError((error) => {
        console.error('Error logging in user:', error);
        return throwError(() => new Error('Failed to login user.'));
      })
    );
  }

  logoutUser() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
