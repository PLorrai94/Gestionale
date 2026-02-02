import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { OrderService } from '../../../core/services/order.service';
import { Order } from '../../../core/models/order.model';
import { NotificationService } from '../../../shared/notification/notification.service';

@Component({
  standalone: true,
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  imports: [CommonModule, RouterModule]
})
export class OrderListComponent implements OnInit {
  private orderService = inject(OrderService);
  private router = inject(Router);
  private notify = inject(NotificationService);

  orders: Order[] = [];
  currentPage = 0;
  pageSize = 20;
  totalElements = 0;
  totalPages = 0;

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAll(this.currentPage, this.pageSize).subscribe({
      next: page => {
        this.orders = page.content;
        this.totalElements = page.totalElements;
        this.totalPages = page.totalPages;
      },
      error: () => this.notify.show('Failed to load orders', 'error')
    });
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadOrders();
    }
  }

  viewDetail(order: Order) {
    this.router.navigate(['/orders', order.id]);
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
