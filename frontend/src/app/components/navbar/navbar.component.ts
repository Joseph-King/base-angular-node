import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCog, faHome } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../environments/environment';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [ RouterModule, FontAwesomeModule, NgbDropdownModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent {

  faCog = faCog;
  faHome = faHome;
  
  title = environment.title

  constructor(private router: Router, public authService: AuthService){

  }

  logoutUser(){
    this.authService.logoutUser();
    this.router.navigate(['login']);
  }
}
