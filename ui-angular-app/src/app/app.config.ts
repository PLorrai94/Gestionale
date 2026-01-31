import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpRequest, HttpHandlerFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { AppConfigService } from './core/app-config.service';
import { provideAnimations } from '@angular/platform-browser/animations';

const AUTH_SKIP_URLS = ['/api/security/auth/authenticate', '/api/security/auth/register'];
const API_PREFIXES = ['/api/security/', '/api/management/', '/api/gateway/', '/api/batch/'];

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
  return next(req);
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
