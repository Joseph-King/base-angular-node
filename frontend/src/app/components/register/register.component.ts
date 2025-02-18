import { Component, inject, OnDestroy, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../services/toast-service/toast.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ FormsModule, NgbToastModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  firstName: string = '';
  lastName: string = '';
  username: string = '';
  email: string = '';
  password: string = '';

  toastText: string = '';

  constructor(private toastService: ToastService, private authService: AuthService, private router: Router){}

  async onRegister() {
    let userInfo = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      username: this.username,
      password: this.password
    }

    if(!this.validateRegister(userInfo)){
      this.toastService.show('', 'All fields are required.', 'bg-danger text-light');
      return;
    } 
    
    if (!this.validateEmail(userInfo.email)){
      this.toastService.show('', 'Email is not valid.', 'bg-danger text-light');
      return;
    }

    let registerRes: any = await this.authService.registerUser(userInfo);
    console.log(registerRes);

    if(registerRes != undefined && registerRes.status === 200){
      this.toastService.show('', 'You are now registered.', 'bg-success text-light');
      this.router.navigate(['/login']);
      return;
    } else {
      this.toastService.show('', registerRes.message ? registerRes.message : 'There was an error registering the user', 'bg-danger text-light');
      return;
    }
  }

  validateRegister(user: any) {
    if(!user.firstName || !user.lastName || !user.email || !user.username || !user.password){
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email: string) {
    let re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    return re.test(email);
  }
}
