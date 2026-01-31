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
  currentPage = 0;
  pageSize = 20;
  totalElements = 0;
  totalPages = 0;

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(search?: string) {
    this.productService.getAll(this.currentPage, this.pageSize, undefined, search).subscribe(page => {
      this.allProducts = page.content;
      this.filteredProducts = page.content;
      this.totalElements = page.totalElements;
      this.totalPages = page.totalPages;
    });
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadProducts();
    }
  }

  onSearch(query: string) {
    this.currentPage = 0;
    if (!query) {
      this.loadProducts();
    } else {
      this.loadProducts(query);
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
