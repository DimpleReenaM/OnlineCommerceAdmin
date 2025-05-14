import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin/admin.service';
import { NgFor, NgIf } from '@angular/common';
import { INITIAL_CONFIG } from '@angular/platform-server';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  imports: [NgIf,NgFor,ReactiveFormsModule,FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  userId: any;
    selectedUserEmail: string = '';
      selectedUserOrders: any[] = [];
      searchText:string=''

  users:any;
  role:string='USER'
  constructor(private route: ActivatedRoute, private userService:AdminService,private router: Router) {}
 
  
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
