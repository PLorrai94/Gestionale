import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/models/product';

@Component({
  standalone: true,
  selector: 'app-product-table',
  templateUrl: './product-table.html',
  styleUrls: ['./product-table.css'],
  imports: [CommonModule]
})
export class ProductTableComponent {
  @Input() products: Product[] = [];
  @Output() edit = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<Product>();
}
