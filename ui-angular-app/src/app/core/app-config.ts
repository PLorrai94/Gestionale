import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from '../app.routes';
import { AppConfigService } from './app-config.service';

export function appConfig(config: AppConfigService): ApplicationConfig {
  return {
    providers: [
      provideRouter(routes),
      provideHttpClient()
      // puoi aggiungere altri provider qui
    ]
  };
}
