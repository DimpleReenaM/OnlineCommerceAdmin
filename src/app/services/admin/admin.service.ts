import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  private apiUrl = 'https://localhost:7174/api/auth/users-with-role'; // Update to your actual endpoint

  constructor(private http: HttpClient) {}

  getUsersOnly(): Observable<any> {
    return this.http.get<any>(this.apiUrl); // assuming the API wraps data inside a `data` field
  }
}
