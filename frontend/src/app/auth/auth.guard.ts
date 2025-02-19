import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  environment = environment

  constructor (private router: Router, private authService: AuthService){

  }

  async canActivate(route: ActivatedRouteSnapshot) {
    let path = route.data["path"] ? route.data["path"] : '';
    let activateRes = await this.authService.canActivate(path);

    if(activateRes){
      return true;
    }
    
    this.router.navigate(['/login']);
    return false;
  }
}