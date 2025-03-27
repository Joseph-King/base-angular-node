import { Injectable } from '@angular/core';
import { JwtService } from './jwt-service/jwt.service';
import { KeycloakAuthService } from './keycloak-service/keycloak.service';
import { HybridService } from './hybrid-service/hybrid.service';
import { ToastService } from '../services/toast-service/toast.service';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string = '';

  user: any = undefined;

  loggedIn: boolean = false;
  showAdmin: boolean = false;

  constructor(
    private jwtService: JwtService,
    private hybridService: HybridService,
    private keycloakService: KeycloakAuthService,
    private toastService: ToastService) { }

  async canActivate(path: string){
    return new Promise(async (resolve) => {
      try{
        if(this.token === '') this.token = `${localStorage.getItem('id_token')?.toString()}`;
        if(this.user === undefined) this.user = JSON.parse(`${localStorage.getItem('user')?.toString()}`);
      } catch(e) {
        resolve(false)
        return;
      }

      switch(environment.authorize){
        case 'jwt':
          let res = await this.jwtService.canActivate(this.token, this.user, path);

          if(res === false){
            this.loggedIn = false;
            this.showAdmin = false;
          } else {
            this.loggedIn = true;
            if(this.user.roles.includes(environment.protectedRoutes.admin)){
              this.showAdmin = true;
            }
          }

          resolve(res);
          return;
        case 'hybrid':
          this.hybridService.canActivate();
          break;
        default:
          this.toastService.show('', 'Unable to register user given authorization settings', 'bg-danger text-light')
      }
    })
  }

  async registerUser(user: any){
    return new Promise(async (resolve) => {
      switch(environment.authorize){
        case 'jwt':
          let res = await this.jwtService.registerUser(user);
          resolve(res);
          return;
        case 'hybrid':
          this.hybridService.registerUser(user);
          break;
        default:
          this.toastService.show('', 'Unable to register user given authorization settings', 'bg-danger text-light')
      }
    })
  }

  async authenticateUser(user: any){
    return new Promise(async (resolve) => {
      switch(environment.authorize){
        case 'jwt':
          let res: any = await this.jwtService.authenticateUser(user);
          this.toastService.show('', `Welcome ${res.user.username}`, 'bg-success text-light');

          this.storeUserData(res.token, res.user);
          resolve(res);
          return;
        default:
          this.toastService.show('', 'Unable to login user given authentication settings', 'bg-danger text-light');
      }
    })
  }

  storeUserData(token: string, user: any){
    console.log(user);
    switch(environment.authorize){
      case 'keycloak':
      case 'jwt':
      case 'hybrid':
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));

        this.token = token;
        this.user = user;
        this.loggedIn = true;
        if(this.user.roles.includes(environment.protectedRoutes.admin)){
          this.showAdmin = true;
        }
        return;
      default:
        this.toastService.show('', 'Unable to save user data given authorization settings', 'bg-danger text-light');
        return;
    }
  }

  async logoutUser(){
    switch(environment.authenticate){
      case 'keycloak':
        break;
      default:
    }
    this.token = '';
    this.user = undefined;
    this.loggedIn = false;
    this.showAdmin = false;

    localStorage.clear();

    this.toastService.show('', `User has been logged out`, 'bg-success text-light');
  }

  getToken(){
    try {
      if(this.token === '') this.token = `${localStorage.getItem('id_token')?.toString()}`;

      return this.token;
    } catch(e) {
      console.log('No token to retrieve');
      return '';
    }
  }

  async getUser(){
    let tempToken: string = this.getToken();

    switch(environment.authorize){
      case 'keycloak':
        return;
      case 'jwt':
        let tempUser = await this.jwtService.getProfile(tempToken);
        this.user = tempUser;

        return tempUser;
      case 'hybrid':
        return;
      default:
          console.log('Unable to retrieve user due to authorization settings');
          return;
    }
  }
}
