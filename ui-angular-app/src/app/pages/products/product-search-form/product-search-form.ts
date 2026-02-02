import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product';

@Component({
  standalone: true,
  selector: 'app-product-search-form',
  templateUrl: './product-search-form.html',
  styleUrls: ['./product-search-form.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ProductSearchFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.form = this.fb.group({ name: [''] });
  }

  onSubmit() {
    const name = this.form.get('name')?.value;
    if (name) {
      this.productService.searchByName(name).subscribe(data => {
        console.log('Risultati ricerca:', data);
        // TODO: connettere con tabella
      });
    }
  }
}
