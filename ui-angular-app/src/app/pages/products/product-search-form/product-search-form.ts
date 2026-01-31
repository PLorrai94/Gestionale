import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-product-search-form',
  templateUrl: './product-search-form.html',
  styleUrls: ['./product-search-form.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ProductSearchFormComponent {
  @Output() search = new EventEmitter<string>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({ name: [''] });
  }

  onSubmit() {
    const name = this.form.get('name')?.value?.trim() || '';
    this.search.emit(name);
  }
}
