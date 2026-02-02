import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product';


@Injectable({ providedIn: 'root' })
export class ProductsComponent  {
  private apiUrl = '/api/management/products';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  searchByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/search?name=${name}`);
  }
}
