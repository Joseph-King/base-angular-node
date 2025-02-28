import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { GroupsComponent } from './groups/groups.component';
import { LogsComponent } from './logs/logs.component';
import { ApiComponent } from './api/api.component';
import { SupportRequestsComponent } from './support-requests/support-requests.component';
import { SmtpComponent } from './smtp/smtp.component';

@Component({
  selector: 'app-admin',
  imports: [ 
    NgbNavModule,
    UsersComponent,
    RolesComponent,
    GroupsComponent,
    LogsComponent,
    ApiComponent,
    SupportRequestsComponent,
    SmtpComponent
   ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  active = 1;

}
