import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

import { provideKeycloak } from 'keycloak-angular';
import { environment } from '../environments/environment';

var providersArr = [
  provideZoneChangeDetection({ eventCoalescing: true }), 
  provideRouter(routes), 
  provideHttpClient()
]

if(environment.authenticate === 'keycloak'){
  providersArr.push(
    provideKeycloak({
      config: {
        url: environment.keycloak.url,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId
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
