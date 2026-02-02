// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { UserLoginRequest } from '../models/user-login-request.model';
import { AuthResponse } from '../models/auth-response.model';

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

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

  register(payload: RegisterPayload): Observable<any> {
    console.log(`Registering user: ${payload.username}`);
    return this.http.post(`${this.apiUrl}/register`, payload).pipe(
      tap(() => console.log('Registration successful!')),
      catchError(error => {
        console.error('Registration failed:', error);
        throw error;
      })
    );
  }

  login(request: UserLoginRequest): Observable<AuthResponse> {
    console.log(`Attempting login for user: ${request.username}`);
    return this.http.post<AuthResponse>(`${this.apiUrl}/authenticate`, request).pipe(
      tap(response => {
        // Mappa il token nel formato che ti aspetti
        const authData: AuthResponse = {
          token: response.token,
          username: response.username,
          email: response.email,
          id: response.id
        };

        localStorage.setItem('currentUser', JSON.stringify(authData));
        this.currentUserSubject.next(authData);

        console.log('Login successful! JWT stored locally.');
        console.log('Token JWT:', authData.token);
        console.log('isLoggedIn:', this.isLoggedIn());
      }),
      catchError(error => {
        console.error('Login failed:', error);
        throw error;
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
    console.log('User logged out.');
    this.router.navigate(['/auth/login']);
  }

  refreshUserFromStorage() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.currentUserSubject.next(user);
    }
  }
}
