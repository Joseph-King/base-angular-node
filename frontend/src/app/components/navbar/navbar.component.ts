import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCog, faHome } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../environments/environment';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

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
}
