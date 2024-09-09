import { Component } from '@angular/core';
import { testProducts } from './TestProducts';
import { Product } from './product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products: Product[] = testProducts;
}
