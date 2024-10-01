import { Component, inject } from '@angular/core';
import { type Product } from './product.model';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductsService } from './products.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NewProductComponent, CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  private productsService = inject(ProductsService);
  products: Product[] = [];

  ngOnInit(): void {
    this.productsService.loadProducts().subscribe({
      next: (resData) => {
        this.products = resData.map((product) => ({
          ...product,
          pricePerProteins: this.calculatePricePerProteins(product),
        }));
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  removeProduct(productId: number) {
    this.productsService.removeProduct(productId).subscribe({
      error: (error) => {
        console.error('Error while removing product', productId);
      },
    });
  }

  private calculatePricePerProteins(product: Product): number {
    if (product.proteins && product.proteins > 0) {
      return (product.price / product.proteins) * 100;
    }
    return 0;
  }
}
