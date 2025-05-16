import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from "../layout/layout/layout.component";
import { HeaderComponent } from "../header/header.component";
import { AdminService } from '../../services/admin/admin.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-userorders',
  imports: [LayoutComponent, HeaderComponent,NgFor,FormsModule,NgIf],
  templateUrl: './userorders.component.html',
  styleUrl: './userorders.component.css'
})
export class UserordersComponent implements OnInit{
    orders: any[] = [];


  constructor(private adminservice:AdminService){}

  ngOnInit(): void {
    this.adminservice.getuserOrders().subscribe(data=>
    {
      this.orders=data
    }
    );
  }

}
