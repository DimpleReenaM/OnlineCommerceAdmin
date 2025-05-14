import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MyProduct } from '../../components/sellerproducts/products/productdto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http:HttpClient) { }
    private apiUrl = 'https://localhost:7174/api/Catalog'; // Change base URL as needed
  getSellerProducts(userId: number): Observable<MyProduct[]> {
  return this.http.get<{ data: MyProduct[] }>(`${this.apiUrl}/seller-products?userId=${userId}`)
    .pipe(
      map(response => response.data) // Extract the products array from the "data" field
    );
}

updateProduct(formData: FormData): Observable<any> {
for (let pair of formData.entries()) {
  console.log(`${pair[0]}:`, pair[1]);
}    return this.http.put(`${this.apiUrl}/product/update`, formData);
  }

   addProduct(product: FormData): Observable<MyProduct> {
    return this.http.post<MyProduct>(`${this.apiUrl}/product/create`, product);
  }

   deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/product/delete/${productId}`);
  }
  

  
}
