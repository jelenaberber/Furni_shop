/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './app/auth.interceptor';

const appProviders = [
  provideHttpClient(),
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [...appConfig.providers, ...appProviders]
}).catch(err => console.error(err));
