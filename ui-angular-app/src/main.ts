import { AppConfigService } from './app/core/app-config.service';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './app/core/interceptors/jwt.interceptor';

const configService = new AppConfigService();

configService.load().then(() => {
  const config = appConfig(configService); // 👈 Esegui la funzione passandogli il service

  bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(),
      ...config.providers, // ✅ Ora accedi correttamente ai providers
      { provide: AppConfigService, useValue: configService },
      provideAnimations(),
      provideRouter(routes),
      importProvidersFrom(HttpClientModule, ReactiveFormsModule),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ]
  });
});
