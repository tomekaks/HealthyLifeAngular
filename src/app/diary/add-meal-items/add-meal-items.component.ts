import { Component, DestroyRef, Input, OnInit } from '@angular/core';
import { Product } from '../../products/product.model';
import { ProductsService } from '../../products/products.service';
import { NewMealItemComponent } from './new-meal-item/new-meal-item.component';

@Component({
  selector: 'app-add-meal-items',
  standalone: true,
  imports: [NewMealItemComponent],
  templateUrl: './add-meal-items.component.html',
  styleUrl: './add-meal-items.component.css',
})
export class AddMealItemsComponent implements OnInit {
  @Input({ required: true }) mealId!: number;
  products: Product[] = [];
  isAddingMealItem = false;

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
}
