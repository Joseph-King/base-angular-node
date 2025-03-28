import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KeycloakAuthService {
  environment = environment

  constructor(private router: Router) { }

  canActivate(){
    if(this.loggedIn()){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  loggedIn() {
    return false;
  }

  logout(){
  }
}
