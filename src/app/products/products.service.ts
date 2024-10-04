import { Injectable } from '@angular/core';
import { CreateProduct, Product, UpdateProduct } from './product.model';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private apiUrl = 'https://localhost:44306/api/products';

  constructor(private httpClient: HttpClient) {}

  addProduct(createProduct: CreateProduct) {
    return this.httpClient.post<CreateProduct>(this.apiUrl, createProduct);
  }

  removeProduct(productId: number) {
    console.log('Removing product');
    return this.httpClient.delete(`${this.apiUrl}/${productId}`);
  }

  loadProducts() {
    return this.fetchProducts();
  }

  getProduct(productId: number) {
    return this.httpClient.get<Product>(`${this.apiUrl}/${productId}`);
  }

  updateProduct(product: UpdateProduct) {
    return this.httpClient.put(this.apiUrl, product);
  }

  private fetchProducts() {
    return this.httpClient.get<Product[]>(this.apiUrl).pipe(
      catchError((error) => {
        return throwError(() => new Error('Something went wrong.'));
      })
    );
  }
}
