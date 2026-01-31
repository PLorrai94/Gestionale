import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { OrderService } from '../../../core/services/order.service';
import { CustomerService } from '../../../core/services/customer.service';
import { ProductService } from '../../../core/services/product.service';
import { Customer } from '../../../core/models/customer.model';
import { Product } from '../../../core/models/product';
import { NotificationService } from '../../../shared/notification/notification.service';

@Component({
  standalone: true,
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class OrderFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private orderService = inject(OrderService);
  private customerService = inject(CustomerService);
  private productService = inject(ProductService);
  private notify = inject(NotificationService);

  form!: FormGroup;
  customers: Customer[] = [];
  products: Product[] = [];

  ngOnInit() {
    this.form = this.fb.group({
      customerId: [null, Validators.required],
      items: this.fb.array([])
    });

    this.customerService.getAll(0, 1000).subscribe(page => this.customers = page.content);
    this.productService.getAll(0, 1000).subscribe(page => this.products = page.content);

    this.addItem();
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  get totalAmount(): number {
    return this.items.controls.reduce((sum, ctrl) => {
      const qty = ctrl.get('quantity')?.value || 0;
      const price = ctrl.get('unitPrice')?.value || 0;
      return sum + qty * price;
    }, 0);
  }

  addItem() {
    this.items.push(this.fb.group({
      productId: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0, [Validators.required, Validators.min(0)]]
    }));
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  onProductChange(index: number) {
    const ctrl = this.items.at(index);
    const productId = ctrl.get('productId')?.value;
    const product = this.products.find(p => p.id === +productId);
    if (product) {
      ctrl.get('unitPrice')?.setValue(product.price);
    }
  }

  onSubmit() {
    if (this.form.invalid || this.items.length === 0) return;

    const data = {
      ...this.form.value,
      customerId: +this.form.value.customerId,
      totalAmount: this.totalAmount,
      items: this.items.value.map((item: any) => ({
        ...item,
        productId: +item.productId
      }))
    };

    this.orderService.create(data).subscribe({
      next: () => {
        this.notify.show('Ordine creato', 'success');
        this.router.navigate(['/orders']);
      },
      error: () => this.notify.show('Errore nella creazione ordine', 'error')
    });
  }
}
