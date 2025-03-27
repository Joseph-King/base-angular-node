import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { faEllipsis, faSearch } from '@fortawesome/free-solid-svg-icons';

import { RolesService } from '../../../services/roles-service/roles.service';

@Component({
  selector: 'app-roles',
  imports: [ FormsModule, FontAwesomeModule, CommonModule, NgbDropdownModule ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {
  roles: any = [];
  
  faEllipsis = faEllipsis;
  faSearch = faSearch;

  searchRole: string = '';

  constructor(private rolesService: RolesService){}

  async ngOnInit(){
    this.roles = await this.rolesService.getRoles();

    console.log(this.roles);
  }

  async disableDelete(roleName: string){
    if(this.roles.length === 1) return true;

    return false;
  }
}
