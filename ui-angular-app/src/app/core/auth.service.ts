// src/app/core/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { Observable } from 'rxjs';

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private config: AppConfigService) {}

  register(data: RegisterRequest): Observable<any> {
    const url = `${this.config.securityServiceUrl}/api/auth/register`;
    return this.http.post(url, data);
  }
}
