import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  authToken: any;
  user: any;

  backend_url: string = environment.backend_url;

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': ''
  });

  constructor(private router:Router, private http: HttpClient ) { }

  async canActivate(token: string){
    if(await this.loggedIn(token)){
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
      console.log('here');
      return true;
    }
    return false;
  }
}
