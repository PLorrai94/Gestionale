import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product';

@Component({
  standalone: true,
  selector: 'app-product-table',
  templateUrl: './product-table.html',
  styleUrls: ['./product-table.css'],
  imports: [CommonModule]
})
export class ProductTableComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAll().subscribe((data: Product[]) => { this.products = data; });
  }
}
