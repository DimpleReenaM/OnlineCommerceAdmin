import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import path from 'path';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { adminGuard } from './guards/admin.guard';
import { UsersComponent } from './components/users/users.component';

export const routes: Routes = [
    {
        path:'',
        pathMatch:'full',
        component:LoginComponent
    },
    {
        path:'dashboard',
        component:DashboardComponent,
        canActivate:[adminGuard]
    },
    {
        path:'users',
        component:UsersComponent,
        canActivate:[adminGuard]
    }
           

];
