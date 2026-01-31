import { AppConfigService } from './app/core/app-config.service';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';

const configService = new AppConfigService();

configService.load().then(() => {
  bootstrapApplication(AppComponent, appConfig(configService));
});
