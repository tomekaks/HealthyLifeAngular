import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../products/product.model';
import { CreateMealItem } from '../../models/mealItem.model';
import { DiaryService } from '../../diary.service';

@Component({
  selector: 'app-new-meal-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-meal-item.component.html',
  styleUrl: './new-meal-item.component.css',
})
export class NewMealItemComponent {
  private diaryService = inject(DiaryService);
  selectedProduct = input.required<Product>();
  mealId = input.required<number>();
  @Output() close = new EventEmitter<void>();
  enteredWeight: number = 0;

  onSubmit() {
    const newMealItem: CreateMealItem = {
      weight: this.enteredWeight,
      calories: (this.selectedProduct().calories * this.enteredWeight) / 100,
      proteins: (this.selectedProduct().proteins * this.enteredWeight) / 100,
      carbs: (this.selectedProduct().carbs * this.enteredWeight) / 100,
      fats: (this.selectedProduct().fats * this.enteredWeight) / 100,
      fiber: (this.selectedProduct().fiber * this.enteredWeight) / 100,
      price: (this.selectedProduct().price * this.enteredWeight) / 100,
      productId: this.selectedProduct().id,
      mealId: this.mealId(),
    };

    this.diaryService.addMealItem(newMealItem).subscribe({
      next: () => {
        this.close.emit();
      },
      error: (error) => {
        console.error('Error while adding exercise', newMealItem);
      },
    });
  }

  onCancel() {
    this.close.emit();
  }
}
