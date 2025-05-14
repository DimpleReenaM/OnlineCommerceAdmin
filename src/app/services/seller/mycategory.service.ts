import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyCategory } from '../../components/sellerproducts/products/productdto';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MycategoryService {

constructor(private http: HttpClient) {}
  private baseUrl = 'https://localhost:7174/api/Catalog/category/getall';

  getCategories(): Observable<MyCategory[]> {
    return this.http.get<{ isSuccessed: boolean; data: MyCategory[] }>(`${this.baseUrl}`)
      .pipe(map(response => response.data)); // ✅ Extract 'data' like in getBrands()
  }}
