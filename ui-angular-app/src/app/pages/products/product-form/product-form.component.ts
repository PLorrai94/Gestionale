import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { NotificationService } from '../../../shared/notification/notification.service';

@Component({
  standalone: true,
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class ProductFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private notify = inject(NotificationService);

  form!: FormGroup;
  isEditMode = false;
  productId: number | null = null;

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productId = +id;
      this.productService.getById(this.productId).subscribe({
        next: product => this.form.patchValue(product),
        error: () => this.notify.show('Errore nel caricamento prodotto', 'error')
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    const data = this.form.value;
    const op = this.isEditMode
      ? this.productService.update(this.productId!, data)
      : this.productService.create(data);

    op.subscribe({
      next: () => {
        this.notify.show(
          this.isEditMode ? 'Prodotto aggiornato' : 'Prodotto creato',
          'success'
        );
        this.router.navigate(['/products']);
      },
      error: () => this.notify.show('Errore nel salvataggio', 'error')
    });
  }
}
