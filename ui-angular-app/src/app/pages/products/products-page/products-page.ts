import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductTableComponent } from '../product-table/product-table';
import { ProductSearchFormComponent } from '../product-search-form/product-search-form';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product';

@Component({
  standalone: true,
  selector: 'app-products-page',
  templateUrl: './products-page.html',
  styleUrls: ['./products-page.css'],
  imports: [CommonModule, RouterModule, ProductTableComponent, ProductSearchFormComponent]
})
export class ProductsPageComponent implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);

  allProducts: Product[] = [];
  filteredProducts: Product[] = [];

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().subscribe(data => {
      this.allProducts = data;
      this.filteredProducts = data;
    });
  }

  onSearch(query: string) {
    if (!query) {
      this.filteredProducts = this.allProducts;
    } else {
      const q = query.toLowerCase();
      this.filteredProducts = this.allProducts.filter(p =>
        p.name.toLowerCase().includes(q)
      );
    }
  }

  onEdit(product: Product) {
    this.router.navigate(['/products', product.id, 'edit']);
  }

  onDelete(product: Product) {
    if (confirm(`Eliminare "${product.name}"?`)) {
      this.productService.delete(product.id).subscribe(() => this.loadProducts());
    }
  }
}
