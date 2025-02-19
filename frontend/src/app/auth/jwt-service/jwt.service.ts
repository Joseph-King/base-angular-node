import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  authToken: any;
  user: any;

  backend_url: string = environment.backend_url;

  protectedRoutes: any = environment.protectedRoutes;

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': ''
  });

  constructor(private router: Router, private http: HttpClient ) { }

  async canActivate(token: string, user: any, path: string){
    if(await this.loggedIn(token)){
      if(this.protectedRoutes[path] && !user.roles.includes(this.protectedRoutes[path])){
        return false
      }

      return true;
    } else {
      return false;
    }
  }

  async registerUser(user: any){
    return new Promise((resolve, reject) => {
      try {
        this.http.post(`${this.backend_url}users/register`, user, { headers: this.headers })
          .subscribe(
            data => resolve(data),
            error => resolve(error)
          )
      } catch(e) {
        reject(e);
      }
    })
  }

  async authenticateUser(user: any){
    return new Promise((resolve, reject) => {
      try {
        this.http.post(`${this.backend_url}users/authenticate`, user, { headers: this.headers })
          .subscribe(
            data => resolve(data),
            error => resolve(error)
          )
      } catch(e) {
        reject(e);
      }
    })
  }

  async getProfile(token: string) {
    this.headers = this.headers.set('Authorization', token);
    return new Promise((resolve, reject) => {
      try {
        this.http.get(`${this.backend_url}users/profile`, { headers: this.headers })
          .subscribe(
            data => resolve(data),
            error => resolve(error)
          )
      } catch (e) {
        reject(e);
      }
    })
  }

  async loggedIn(token: string) {
    let getProfileRes: any = await this.getProfile(token);

    if(getProfileRes !== undefined && getProfileRes.status == 200){
      return true;
    }
    return false;
  }
}
