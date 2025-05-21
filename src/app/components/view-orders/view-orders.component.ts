import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin/admin.service';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgFor, NgIf } from '@angular/common';
import { OrderStatus } from './statusDTO';
import { LayoutComponent } from "../layout/layout/layout.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-view-orders',
  imports: [ReactiveFormsModule, NgIf, NgFor, FormsModule, LayoutComponent, HeaderComponent],
  templateUrl: './view-orders.component.html',
  styleUrl: './view-orders.component.css'
})
export class ViewOrdersComponent {

  orders: any[] = [];
    users: any;
      orderStatuses = Object.values(OrderStatus); 

  constructor(private route: ActivatedRoute, private userService:AdminService) {}

  ngOnInit(): void {
   const userIdParam = this.route.snapshot.paramMap.get('userId');
  const userId = userIdParam ? parseInt(userIdParam, 10) : null;

  if (userId) {
    this.loadUserOrders(userId);
  } else {
    console.error('Invalid userId');
  }
  }

  loadUserOrders(userId:number) {
    this.userService.getOrdersByUserId(userId).subscribe(data => {
      this.orders = data;
    });
  }
  updateShippingStatus(orderId: number, newStatus: string) {

    const userIdParam = this.route.snapshot.paramMap.get('userId');
  const userId = userIdParam ? parseInt(userIdParam, 10) : null;
    this.userService.updateShippingStatus(orderId, newStatus ,userId).subscribe({
      next: () => {
         Swal.fire({
                  title: 'Status Changed',
                  text: `Delivery status changed to ${newStatus}`,
                  icon: 'success',
                  confirmButtonText: 'Okay',
                });
      },
      error: (err) => {
        console.error('Error updating shipping status', err);
      }
    });
  }

}
