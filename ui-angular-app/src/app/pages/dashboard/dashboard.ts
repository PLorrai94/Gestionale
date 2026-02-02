import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { ProductService } from '../../core/services/product.service';
import { CustomerService } from '../../core/services/customer.service';
import { OrderService } from '../../core/services/order.service';
import { forkJoin } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  imports: [CommonModule, RouterModule]
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private productService = inject(ProductService);
  private customerService = inject(CustomerService);
  private orderService = inject(OrderService);

  username = '';
  stats = { products: 0, customers: 0, orders: 0 };
  loading = true;
  error = '';

  ngOnInit(): void {
    this.username = this.authService.currentUserValue?.username || '';

    forkJoin({
      products: this.productService.getAll(0, 1),
      customers: this.customerService.getAll(0, 1),
      orders: this.orderService.getAll(0, 1)
    }).subscribe({
      next: (data) => {
        this.stats.products = data.products.totalElements;
        this.stats.customers = data.customers.totalElements;
        this.stats.orders = data.orders.totalElements;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load dashboard data.';
        this.loading = false;
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
