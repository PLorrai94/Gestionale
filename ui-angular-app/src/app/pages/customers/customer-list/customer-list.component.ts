import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CustomerService } from '../../../core/services/customer.service';
import { Customer } from '../../../core/models/customer.model';
import { ConfirmDialogService } from '../../../shared/confirm-dialog/confirm-dialog.service';
import { NotificationService } from '../../../shared/notification/notification.service';

@Component({
  standalone: true,
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  imports: [CommonModule, RouterModule]
})
export class CustomerListComponent implements OnInit {
  private customerService = inject(CustomerService);
  private router = inject(Router);
  private confirmService = inject(ConfirmDialogService);
  private notify = inject(NotificationService);

  customers: Customer[] = [];

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getAll().subscribe({
      next: data => this.customers = data,
      error: () => this.notify.show('Errore nel caricamento clienti', 'error')
    });
  }

  onEdit(customer: Customer) {
    this.router.navigate(['/customers', customer.id, 'edit']);
  }

  onDelete(customer: Customer) {
    this.confirmService.confirm('Elimina Cliente', `Eliminare "${customer.firstName} ${customer.lastName}"?`)
      .subscribe(confirmed => {
        if (confirmed) {
          this.customerService.delete(customer.id).subscribe({
            next: () => {
              this.notify.show('Cliente eliminato', 'success');
              this.loadCustomers();
            },
            error: () => this.notify.show('Errore durante l\'eliminazione', 'error')
          });
        }
      });
  }
}
