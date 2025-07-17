import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSearchForm } from './product-search-form';

describe('ProductSearchForm', () => {
  let component: ProductSearchForm;
  let fixture: ComponentFixture<ProductSearchForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSearchForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSearchForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
