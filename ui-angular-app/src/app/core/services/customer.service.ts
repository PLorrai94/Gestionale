import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { PageResponse } from '../models/page-response.model';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private apiUrl = '/api/management/customers';

  constructor(private http: HttpClient) {}

  getAll(page = 0, size = 20, sort?: string, search?: string): Observable<PageResponse<Customer>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    if (sort) params = params.set('sort', sort);
    if (search) params = params.set('search', search);
    return this.http.get<PageResponse<Customer>>(this.apiUrl, { params });
  }

  getById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  create(customer: Partial<Customer>): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  update(id: number, customer: Partial<Customer>): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/${id}`, customer);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
