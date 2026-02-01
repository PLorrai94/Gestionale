import { ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpRequest, HttpHandlerFn, HttpErrorResponse, provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { AppConfigService } from './core/app-config.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthService } from './core/services/auth';
import { catchError, switchMap, throwError } from 'rxjs';

const AUTH_SKIP_URLS = [
  '/api/auth/authenticate',
  '/api/auth/register',
  '/api/auth/refresh'
];
const API_PREFIXES = ['/api/auth/', '/api/management/', '/api/batch/'];

let isRefreshing = false;

function jwtInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  console.log('JWT Interceptor: Request URL:', req.url);
  const isApiUrl = API_PREFIXES.some(prefix => req.url.startsWith(prefix));
  const isAuthEndpoint = AUTH_SKIP_URLS.some(url => req.url.includes(url));
  console.log('JWT Interceptor: isApiUrl:', isApiUrl, 'isAuthEndpoint:', isAuthEndpoint);

  // Add token to request if it's an API call and not an auth endpoint
  if (isApiUrl && !isAuthEndpoint) {
    const stored = localStorage.getItem('currentUser');
    const token = stored ? JSON.parse(stored)?.token : localStorage.getItem('jwt');
    if (token) {
      console.log('JWT Interceptor: Adding Authorization header');
      req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    } else {
      console.log('JWT Interceptor: No token found');
    }
  } else {
    console.log('JWT Interceptor: Skipping Authorization header for auth endpoint');
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('JWT Interceptor: Error status:', error.status, 'URL:', req.url);
      // Handle 401 Unauthorized errors
      if (error.status === 401 && !isAuthEndpoint && !isRefreshing) {
        console.log('JWT Interceptor: Handling 401 error');
        isRefreshing = true;
        const authService = inject(AuthService);
        const refreshToken = authService.getRefreshToken();

        if (refreshToken) {
          return authService.refreshAccessToken().pipe(
            switchMap(response => {
              isRefreshing = false;
              // Update the token in storage
              if (response.token) {
                const currentUser = localStorage.getItem('currentUser');
                if (currentUser) {
                  const userData = JSON.parse(currentUser);
                  userData.token = response.token;
                  localStorage.setItem('currentUser', JSON.stringify(userData));
                } else {
                  localStorage.setItem('jwt', response.token);
                }
              }
              // Retry the original request with new token
              const retryReq = req.clone({
                setHeaders: { Authorization: `Bearer ${response.token}` }
              });
              return next(retryReq);
            }),
            catchError(refreshError => {
              isRefreshing = false;
              // If refresh fails, logout the user
              authService.logout();
              return throwError(() => refreshError);
            })
          );
        } else {
          // No refresh token, logout
          const authService = inject(AuthService);
          authService.logout();
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
