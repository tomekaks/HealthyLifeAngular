import { Injectable } from '@angular/core';
import { CreateProduct, Product } from './product.model';
import { testProducts } from './TestProducts';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  products: Product[] = testProducts;
  private apiUrl = 'https://localhost:44306/api/products';

  constructor(private httpClient: HttpClient) {}

  addProduct(createProduct: CreateProduct) {
    const newProduct: Product = {
      id: this.products.length + 1,
      name: createProduct.name,
      calories: createProduct.calories,
      proteins: createProduct.proteins,
      carbs: createProduct.carbs,
      fats: createProduct.fats,
      fiber: createProduct.fiber,
      price: createProduct.price,
      createdBy: '',
    };
    this.products.push(newProduct);
  }

  removeProduct(productId: number) {
    console.log('Removing product');
    this.products = this.products.filter((product) => product.id !== productId);
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
