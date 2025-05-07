import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin/admin.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [NgIf,NgFor],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  userEmail: string = '';
  users:any;
  constructor(private route: ActivatedRoute, private userService:AdminService) {}
 
  
  ngOnInit(): void {
    this.userService.getUsersOnly().subscribe({
      next: (res) => {
        this.users = res.data; // assuming `data` field wraps the list
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }

}
