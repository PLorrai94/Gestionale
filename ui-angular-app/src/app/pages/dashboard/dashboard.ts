import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../core/services/auth';
import { ProductService } from '../../core/services/product.service';
import { CustomerService } from '../../core/services/customer.service';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../core/models/order.model';

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

  totalProducts = 0;
  totalCustomers = 0;
  pendingOrders = 0;
  totalRevenue = 0;
  recentOrders: Order[] = [];
  loading = true;

  ngOnInit() {
    forkJoin({
      products: this.productService.getAll(),
      customers: this.customerService.getAll(),
      orders: this.orderService.getAll()
    }).subscribe({
      next: ({ products, customers, orders }) => {
        this.totalProducts = products.length;
        this.totalCustomers = customers.length;
        this.pendingOrders = orders.filter(o => o.status === 'PENDING').length;
        this.totalRevenue = orders
          .filter(o => o.status !== 'CANCELLED')
          .reduce((sum, o) => sum + o.totalAmount, 0);
        this.recentOrders = orders
          .sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
          })
          .slice(0, 5);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'PENDING': return 'status-pending';
      case 'CONFIRMED': return 'status-confirmed';
      case 'SHIPPED': return 'status-shipped';
      case 'COMPLETED': return 'status-completed';
      case 'CANCELLED': return 'status-cancelled';
      default: return '';
    }
  }
}
