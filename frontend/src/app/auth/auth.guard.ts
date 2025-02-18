import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  environment = environment

  constructor (private router: Router, private authService: AuthService){

  }

  async canActivate() {
    let activateRes = await this.authService.canActivate();

    if(activateRes){
      return true;
    }
    
    this.router.navigate(['/login']);
    return false;
  }
}