import { Component, DestroyRef } from '@angular/core';
import { type Product } from './product.model';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NewProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products: Product[] = [];
  isAddingProduct = false;

  constructor(
    private productsService: ProductsService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    console.log('fetching data');
    const subscription = this.productsService.loadProducts().subscribe({
      next: (resData) => {
        console.log(resData);
        this.products = resData;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onStartAddProduct() {
    this.isAddingProduct = true;
  }

  onCloseAddProduct() {
    this.isAddingProduct = false;
  }

  removeProduct(productId: number) {
    const subscription = this.productsService
      .removeProduct(productId)
      .subscribe({
        error: (error) => {
          console.error('Error while removing product', productId);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
