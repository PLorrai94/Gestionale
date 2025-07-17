import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';

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
