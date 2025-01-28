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
    'Content-Type': 'application/json'
  });

  constructor(private router:Router, private http: HttpClient ) { }

  canActivate(){
    if(this.loggedIn()){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  async registerUser(user: any){
    return this.http.post(`${this.backend_url}users/register`, user, { headers: this.headers });
  }

  authenticateUser(user: any){
    return this.http.post(`${this.backend_url}users/authenticate`, user, {headers: this.headers});
  }

  getProfile() {
    this.loadToken();
    this.headers.append('Authorization', this.authToken);
    return this.http.get(`${this.backend_url}users/profile`, { headers: this.headers})
  }

  storeUserData(token: any, user: any) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return false;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
