import { ApplicationConfig, Provider, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { AppConfigService } from './core/app-config.service';
import { provideAnimations } from '@angular/platform-browser/animations';

export function appConfig(config: AppConfigService): ApplicationConfig {
  return {
    providers: [
      provideRouter(routes),
      provideAnimations(),
      provideHttpClient(
        withInterceptors([
          (req, next) => {
            const token = localStorage.getItem('jwt');
            if (token) {
              req = req.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
              });
            }
            return next(req);
          }
        ])
      ),
      { provide: AppConfigService, useValue: config }
    ]
  };
}

