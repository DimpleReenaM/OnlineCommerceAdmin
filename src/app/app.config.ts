import { ApplicationConfig } from '@angular/core';
import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

import { routes } from './app.routes';
import { AuthIntercetorInterceptor } from './interceptors/api-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),

    // ✅ Use withInterceptorsFromDi to enable class-based interceptors
    provideHttpClient(withInterceptorsFromDi()),

    // ✅ JWT config
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,

    // ✅ Register the Auth Interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthIntercetorInterceptor,
      multi: true
    }
  ]
};
