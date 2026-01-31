import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrderService } from '../../../core/services/order.service';
import { Order, OrderStatus } from '../../../core/models/order.model';
import { NotificationService } from '../../../shared/notification/notification.service';
import { ConfirmDialogService } from '../../../shared/confirm-dialog/confirm-dialog.service';

@Component({
  standalone: true,
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
  imports: [CommonModule, RouterModule]
})
export class OrderDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private orderService = inject(OrderService);
  private notify = inject(NotificationService);
  private confirmService = inject(ConfirmDialogService);

  order: Order | null = null;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.orderService.getById(+id).subscribe({
        next: data => this.order = data,
        error: () => this.notify.show('Errore nel caricamento ordine', 'error')
      });
    }
  }

  updateStatus(status: OrderStatus) {
    if (!this.order) return;
    this.orderService.updateStatus(this.order.id, status).subscribe({
      next: updated => {
        this.order = updated;
        this.notify.show(`Stato aggiornato a ${status}`, 'success');
      },
      error: () => this.notify.show('Errore nell\'aggiornamento stato', 'error')
    });
  }

  cancelOrder() {
    if (!this.order) return;
    this.confirmService.confirm('Annulla Ordine', 'Sei sicuro di voler annullare questo ordine?')
      .subscribe(confirmed => {
        if (confirmed) {
          this.orderService.cancel(this.order!.id).subscribe({
            next: updated => {
              this.order = updated;
              this.notify.show('Ordine annullato', 'success');
            },
            error: () => this.notify.show('Errore nell\'annullamento', 'error')
          });
        }
      });
  }

  deleteOrder() {
    if (!this.order) return;
    this.confirmService.confirm('Elimina Ordine', 'Eliminare definitivamente questo ordine?')
      .subscribe(confirmed => {
        if (confirmed) {
          this.orderService.delete(this.order!.id).subscribe({
            next: () => {
              this.notify.show('Ordine eliminato', 'success');
              this.router.navigate(['/orders']);
            },
            error: () => this.notify.show('Errore nell\'eliminazione', 'error')
          });
        }
      });
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
