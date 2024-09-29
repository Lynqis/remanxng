import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/showcase/layout/app.config';
import { AppComponent } from './app/showcase/layout/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
