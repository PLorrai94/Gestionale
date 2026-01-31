import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CustomerService } from '../../../core/services/customer.service';
import { NotificationService } from '../../../shared/notification/notification.service';

@Component({
  standalone: true,
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class CustomerFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private customerService = inject(CustomerService);
  private notify = inject(NotificationService);

  form!: FormGroup;
  isEditMode = false;
  customerId: number | null = null;

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['']
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.customerId = +id;
      this.customerService.getById(this.customerId).subscribe({
        next: customer => this.form.patchValue(customer),
        error: () => this.notify.show('Errore nel caricamento cliente', 'error')
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    const data = this.form.value;
    const op = this.isEditMode
      ? this.customerService.update(this.customerId!, data)
      : this.customerService.create(data);

    op.subscribe({
      next: () => {
        this.notify.show(
          this.isEditMode ? 'Cliente aggiornato' : 'Cliente creato',
          'success'
        );
        this.router.navigate(['/customers']);
      },
      error: () => this.notify.show('Errore nel salvataggio', 'error')
    });
  }
}
