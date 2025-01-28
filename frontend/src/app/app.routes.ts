import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent}
];
