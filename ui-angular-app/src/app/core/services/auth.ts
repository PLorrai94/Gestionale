import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { UserLoginRequest } from '../models/user-login-request.model';
import { UserRegistrationRequest } from '../models/user-registration-request.model';
import { AuthResponse } from '../models/auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth';

  private currentUserSubject: BehaviorSubject<AuthResponse | null>;
  public currentUser: Observable<AuthResponse | null>;

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<AuthResponse | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AuthResponse | null {
    return this.currentUserSubject.value;
  }

  register(payload: UserRegistrationRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, payload).pipe(
      tap((response) => {
        const authData: AuthResponse = {
          token: response.token,
          username: response.username,
          email: response.email,
          id: response.id
        };
        localStorage.setItem('currentUser', JSON.stringify(authData));
        this.currentUserSubject.next(authData);
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  login(request: UserLoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/authenticate`, request).pipe(
      tap(response => {
        const authData: AuthResponse = {
          token: response.token,
          username: response.username,
          email: response.email,
          id: response.id
        };
        localStorage.setItem('currentUser', JSON.stringify(authData));
        this.currentUserSubject.next(authData);
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  isLoggedIn(): boolean {
    return this.currentUserValue !== null && !!this.currentUserValue.token;
  }

  getToken(): string | null {
    return this.currentUserValue?.token || null;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }
}
