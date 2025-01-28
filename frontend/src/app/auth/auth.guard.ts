import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { environment } from '../../environments/environment';
import { JwtService } from './jwt-service/jwt.service';
import { canActivateAuthRole } from './keycloak-service/keycloak.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (private router:Router){

  }

  canActivate() {
    return false;
  }
}