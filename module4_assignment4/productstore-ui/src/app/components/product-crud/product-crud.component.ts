import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.css']
})
export class ProductCrudComponent implements OnInit {
  products: Product[] = [];

  formData: Product = {
    name: '',
    brand: '',
    category: '',
    price: 0,
    stock: 0
  };

  editId: string | null = null;
  errorMessage = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Failed to load products';
      }
    });
  }

  saveProduct(): void {
    if (this.editId) {
      this.productService.update(this.editId, this.formData).subscribe({
        next: () => this.afterSave(),
        error: (err) => {
          this.errorMessage = err?.error?.message || 'Failed to update product';
        }
      });
      return;
    }

    this.productService.create(this.formData).subscribe({
      next: () => this.afterSave(),
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Failed to add product';
      }
    });
  }

  editProduct(product: Product): void {
    this.editId = product._id || null;
    this.formData = {
      name: product.name,
      brand: product.brand,
      category: product.category,
      price: product.price,
      stock: product.stock
    };
  }

  deleteProduct(id?: string): void {
    if (!id) {
      return;
    }

    this.productService.delete(id).subscribe({
      next: () => this.loadProducts(),
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Failed to delete product';
      }
    });
  }

  cancelEdit(): void {
    this.resetForm();
  }

  private afterSave(): void {
    this.loadProducts();
    this.resetForm();
  }

  private resetForm(): void {
    this.editId = null;
    this.formData = {
      name: '',
      brand: '',
      category: '',
      price: 0,
      stock: 0
    };
  }
}
