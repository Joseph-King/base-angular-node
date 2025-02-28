import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user-service/user.service';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users: any = undefined;

  constructor(private userService: UserService){}

  async ngOnInit(){
    this.users = await this.userService.getUsers();

    console.log(this.users);
  }
}
