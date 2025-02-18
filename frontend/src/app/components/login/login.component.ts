import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast-service/toast.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ FormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private toastService: ToastService, private authService: AuthService, private router: Router){}

  async onLogin(){
    let userInfo = {
      username: this.username,
      password: this.password
    }

    if(!this.validateLogin(userInfo)){
      this.toastService.show('', 'All fields are required.', 'bg-danger text-light');
      return;
    } 

    let loginRes: any = await this.authService.authenticateUser(userInfo);

    if(loginRes != undefined && loginRes.res === false){
      this.toastService.show('', 'Invalid Username/Password.', 'bg-danger text-light');
      return;
    }

    this.router.navigate(['/']);

    return;

  }

  validateLogin(user: any){
    if(!user.username || !user.password){
      return false;
    } else {
      return true;
    }
  }

}
