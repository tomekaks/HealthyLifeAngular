import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { jwtInterceptor } from './app/auth/jwt.interceptor';
import { ConfirmationService } from 'primeng/api';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([jwtInterceptor])),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    ConfirmationService,
  ],
}).catch((err) => console.error(err));
