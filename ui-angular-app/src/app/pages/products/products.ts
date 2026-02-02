import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product';

@Component({
  standalone: true,
  selector: 'app-products',
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
  imports: [CommonModule, RouterModule]
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);

  products: Product[] = [];
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (page) => {
        this.products = page.content;
      },
      error: () => {
        this.errorMessage = 'Failed to load products.';
      }
    });
  }
}
