import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': ''
  });

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUsers() {
    return new Promise((resolve, reject) => {
      this.headers = this.headers.set('Authorization', this.authService.getToken())
      try {
        this.http.get(`${environment.backend_url}users`, { headers: this.headers })
          .subscribe(
            data => resolve(data),
            error => resolve(error)
          )
      } catch(err) {
        reject(err);
      }
    })
  }
 
}