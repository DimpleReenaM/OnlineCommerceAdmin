import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin/admin.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject, AfterViewInit} from '@angular/core';
import { LayoutComponent } from "../layout/layout/layout.component";
import { HeaderComponent } from "../header/header.component";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-sellerdetails',
  imports: [NgFor, NgIf, ReactiveFormsModule, RouterLink, LayoutComponent, HeaderComponent,FormsModule],
  templateUrl: './sellerdetails.component.html',
  styleUrl: './sellerdetails.component.css'
})
export class SellerdetailsComponent implements  OnInit {
  userEmail: string = '';
  searchText:string=''
  users:any;
  role:string='SELLER'
  constructor(private route: ActivatedRoute, private userService:AdminService,@Inject(PLATFORM_ID) private platformId: Object,private router:Router) {}

  

  ngOnInit(): void {
    this.userService.getUsersOnly(this.role).subscribe({
      next: (res) => {
        this.users = res.data; // assuming `data` field wraps the list
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }

   viewOrders(userId: string) {
      this.router.navigate(['/admin/user-orders', userId]);
    }

    
  filteredUsers() {
    const query = this.searchText.toLowerCase();
    return this.users.filter((user: any) =>
      user.userName?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query)
    );
  }
  






 }