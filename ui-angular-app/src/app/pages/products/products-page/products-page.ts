import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTableComponent } from '../product-table/product-table';
import { ProductSearchFormComponent } from '../product-search-form/product-search-form';

@Component({
  standalone: true,
  selector: 'app-products-page',
  templateUrl: './products-page.html',
  styleUrls: ['./products-page.css'],
  imports: [CommonModule, ProductTableComponent, ProductSearchFormComponent]
})
export class ProductsPageComponent {}
