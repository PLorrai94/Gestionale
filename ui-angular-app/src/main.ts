import { AppConfigService } from './app/core/app-config.service';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

const configService = new AppConfigService();

configService.load().then(() => {
  const config = appConfig(configService); // 👈 Esegui la funzione passandogli il service

  bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(),
      ...config.providers, // ✅ Ora accedi correttamente ai providers
      { provide: AppConfigService, useValue: configService },
      provideAnimations() 
    ]
  });
});
