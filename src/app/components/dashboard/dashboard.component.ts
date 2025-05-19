import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardDto } from './dashboardDto';
import { AdminService } from '../../services/admin/admin.service';
import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from '../layout/layout/layout.component';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, NgFor, ReactiveFormsModule, LayoutComponent, HeaderComponent,CurrencyPipe,NgIf,NgClass],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  dashboardData!: DashboardDto;

  constructor(private dashboardService: AdminService) {}

  ngOnInit(): void {
    this.dashboardService.getDashboardData().subscribe({
      next: (res) => {
        this.dashboardData = res;
      },
      error: (err) => {
        console.error('Dashboard fetch error:', err);
      }
    });
  }

  
    
}
