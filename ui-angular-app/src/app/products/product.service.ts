import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from '../core/app-config.service';

export interface Product {
  id: number;
  name: string;
  price: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient, private config: AppConfigService) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.config.apiGatewayUrl}/api/management/products`);
  }
}
