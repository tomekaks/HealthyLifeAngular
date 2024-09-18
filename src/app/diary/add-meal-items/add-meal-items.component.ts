import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { Product } from '../../products/product.model';
import { ProductsService } from '../../products/products.service';
import { NewMealItemComponent } from './new-meal-item/new-meal-item.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-meal-items',
  standalone: true,
  imports: [NewMealItemComponent],
  templateUrl: './add-meal-items.component.html',
  styleUrl: './add-meal-items.component.css',
})
export class AddMealItemsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  mealId: number = Number(this.route.snapshot.paramMap.get('mealId'));
  products: Product[] = [];
  isAddingMealItem = false;
  selectedProduct!: Product;

  ngOnInit(): void {
    this.fetchUsers();
    console.log(this.mealId);
  }

  onStartAddMealItem(product: Product) {
    this.selectedProduct = product;
    this.isAddingMealItem = true;
  }

  onCloseAddMealItem() {
    this.isAddingMealItem = false;
  }

  private fetchUsers() {
    console.log('fetching data');
    this.productsService.loadProducts().subscribe({
      next: (resData) => {
        console.log(resData);
        this.products = resData;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }
}
