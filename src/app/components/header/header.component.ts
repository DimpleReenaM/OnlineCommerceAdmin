import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/Login/login.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

constructor(private router: Router,private authService:LoginService){}

  onLogout(): void {

  this.authService.LogOut().subscribe({
    next: (res) => {
    this.router.navigate(['/']); // Redirect to login page
    },
    error: (err) => {
      console.error('Logout failed', err);
    }
  });

}
    @Output() toggle = new EventEmitter<void>();

  

}
