import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { NewMealItemComponent } from './new-meal-item/new-meal-item.component';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../products/products.service';
import { Product } from '../../../products/product.model';

@Component({
  selector: 'app-add-meal-items',
  standalone: true,
  imports: [NewMealItemComponent],
  templateUrl: './add-meal-items.component.html',
  styleUrl: './add-meal-items.component.css',
})
export class AddMealItemsComponent implements OnInit {
  private productsService = inject(ProductsService);
  private route = inject(ActivatedRoute);
  mealId: number = Number(this.route.snapshot.paramMap.get('mealId'));
  products: Product[] = [];
  isAddingMealItem = false;
  selectedProduct!: Product;

  ngOnInit(): void {
    this.fetchProducts();
  }

  onStartAddMealItem(product: Product) {
    this.selectedProduct = product;
    this.isAddingMealItem = true;
  }

  onCloseAddMealItem() {
    this.isAddingMealItem = false;
  }

  private fetchProducts() {
    console.log('fetching products');
    this.productsService.loadProducts().subscribe({
      next: (resData) => {
        this.products = resData;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }
}
