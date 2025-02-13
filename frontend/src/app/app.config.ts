import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideKeycloak } from 'keycloak-angular';
import { environment } from '../environments/environment';

var providersArr = [
  provideZoneChangeDetection({ eventCoalescing: true }), 
  provideRouter(routes), 
]

if(environment.auth === 'keycloak'){
  providersArr.push(
    provideKeycloak({
      config: {
        url: 'http://localhost:8080',
        realm: 'test',
        clientId: 'test'
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false
      }
    })
  )
}

export const appConfig: ApplicationConfig = {
  providers: providersArr
};
