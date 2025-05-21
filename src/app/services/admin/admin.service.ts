import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardDto } from '../../components/dashboard/dashboardDto';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  private apiUrl = 'https://localhost:7174/api'; // Update to your actual endpoint

  constructor(private http: HttpClient) {}

  getUsersOnly(role:string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auth/users-with-role?role=${role}`); // assuming the API wraps data inside a `data` field
  }
  getOrdersByUserId(userId: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/Order/user-orders/${userId}`);
  }
  updateShippingStatus(orderId: number, newStatus: string,userId:any): Observable<void> {
    const body = { orderId, newStatus ,userId};

    return this.http.put<void>(`${this.apiUrl}/Order/update-status`,body);
  }
   getDashboardData(): Observable<DashboardDto> {
    return this.http.get<DashboardDto>(`${this.apiUrl}/AdminDashboard`);
  }

  getuserOrders():Observable<any>{
      return this.http.get<any>(`${this.apiUrl}/Order/Get-all-orders`);

  }


}
