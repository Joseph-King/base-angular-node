import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HybridService {
  environment = environment;

  constructor(private router: Router) { }

  canActivate(){
    if(this.loggedIn()){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  registerUser(user: any){
    
  }

  loggedIn() {
    return false;
  }

  logout(){
  }
}
