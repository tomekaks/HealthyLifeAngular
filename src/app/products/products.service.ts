import { Injectable } from '@angular/core';
import { CreateProduct, Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private apiUrl = 'https://localhost:44306/api/products';

  constructor(private httpClient: HttpClient) {}

  addProduct(createProduct: CreateProduct) {
    this.httpClient.post<CreateProduct>(this.apiUrl, createProduct);
  }

  removeProduct(productId: number) {
    console.log('Removing product');
    this.httpClient.delete(`${this.apiUrl}/${productId}`);
  }

  loadProducts() {
    return this.fetchProducts();
  }

  private fetchProducts() {
    return this.httpClient.get<Product[]>(this.apiUrl).pipe(
      catchError((error) => {
        return throwError(() => new Error('Something went wrong.'));
      })
    );
  }
}
