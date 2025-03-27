import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { faEllipsis, faSearch } from '@fortawesome/free-solid-svg-icons';

import { UserService } from '../../../services/user-service/user.service';

@Component({
  selector: 'app-users',
  imports: [ FormsModule, FontAwesomeModule, CommonModule, NgbDropdownModule ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users: any = [];

  faEllipsis = faEllipsis;
  faSearch = faSearch;

  searchUser: string = '';

  getUsersError = false;

  constructor(private userService: UserService){}

  async ngOnInit(){
    try{
      this.users = await this.userService.getUsers();
    } catch(err) {
      this.getUsersError = true;
    }
  }
}
