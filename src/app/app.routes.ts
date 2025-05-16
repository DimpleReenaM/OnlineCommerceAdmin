import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import path from 'path';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { adminGuard } from './guards/admin.guard';
import { UsersComponent } from './components/users/users.component';
import { SellerdetailsComponent } from './components/sellerdetails/sellerdetails.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';
import { ProductsComponent } from './components/sellerproducts/products/products.component';
import { UserordersComponent } from './components/userorders/userorders.component';

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
    ,{
        path:'seller',
        component:SellerdetailsComponent,
        canActivate:[adminGuard]
    }
    ,
    {
        path:'admin/user-orders/:userId',
        component:ViewOrdersComponent,
        canActivate:[adminGuard]

    },
    {
        path:'products/seller/:sellerId',
        component:ProductsComponent,
        canActivate:[adminGuard]

    },
    {
        path:'allorders',
        component:UserordersComponent,
        canActivate:[adminGuard]
    }
           

];
