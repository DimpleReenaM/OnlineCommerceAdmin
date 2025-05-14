import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin/admin.service';
import { NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject, AfterViewInit} from '@angular/core';
@Component({
  selector: 'app-sellerdetails',
  imports: [NgFor,NgIf,ReactiveFormsModule,RouterLink],
  templateUrl: './sellerdetails.component.html',
  styleUrl: './sellerdetails.component.css'
})
export class SellerdetailsComponent implements  OnInit {
  userEmail: string = '';
  users:any;
  role:string='SELLER'
  constructor(private route: ActivatedRoute, private userService:AdminService,@Inject(PLATFORM_ID) private platformId: Object) {}

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
 }