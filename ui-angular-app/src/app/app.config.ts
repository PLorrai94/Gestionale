import { ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpRequest, HttpHandlerFn, HttpErrorResponse, provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { AppConfigService } from './core/app-config.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthService } from './core/services/auth';
import { catchError, switchMap, throwError } from 'rxjs';

const AUTH_SKIP_URLS = [
  '/api/security/auth/authenticate',
  '/api/security/auth/register',
  '/api/security/auth/refresh'
];
const API_PREFIXES = ['/api/security/', '/api/management/', '/api/gateway/', '/api/batch/'];

let isRefreshing = false;

function jwtInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const isApiUrl = API_PREFIXES.some(prefix => req.url.startsWith(prefix));
  const isAuthEndpoint = AUTH_SKIP_URLS.some(url => req.url.includes(url));

  if (isApiUrl && !isAuthEndpoint) {
    const stored = localStorage.getItem('currentUser');
    const token = stored ? JSON.parse(stored)?.token : localStorage.getItem('jwt');
    if (token) {
      req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !isAuthEndpoint && !isRefreshing) {
        isRefreshing = true;
        const authService = inject(AuthService);
        const refreshToken = authService.getRefreshToken();

        if (refreshToken) {
          return authService.refreshAccessToken().pipe(
            switchMap(response => {
              isRefreshing = false;
              const retryReq = req.clone({
                setHeaders: { Authorization: `Bearer ${response.token}` }
              });
              return next(retryReq);
            }),
            catchError(refreshError => {
              isRefreshing = false;
              authService.logout();
              return throwError(() => refreshError);
            })
          );
        }
      }
      return throwError(() => error);
    })
  );
}

export function appConfig(config: AppConfigService): ApplicationConfig {
  return {
    providers: [
      provideRouter(routes),
      provideAnimations(),
      provideHttpClient(withInterceptors([jwtInterceptor])),
      { provide: AppConfigService, useValue: config }
    ]
  };
}
