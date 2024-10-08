import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DiaryService } from '../../../diary.service';
import { Product } from '../../../../products/product.model';
import { CreateMealItem } from '../../../models/mealItem.model';

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
    const newMealItem: CreateMealItem = this.createMealItem();

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

  private createMealItem(): CreateMealItem {
    return {
      weight: this.enteredWeight,
      calories: Math.round(
        (this.selectedProduct().calories * this.enteredWeight) / 100
      ),
      proteins: Math.round(
        (this.selectedProduct().proteins * this.enteredWeight) / 100
      ),
      carbs: Math.round(
        (this.selectedProduct().carbs * this.enteredWeight) / 100
      ),
      fats: Math.round(
        (this.selectedProduct().fats * this.enteredWeight) / 100
      ),
      fiber: Math.round(
        (this.selectedProduct().fiber * this.enteredWeight) / 100
      ),
      price: Number(
        ((this.selectedProduct().price * this.enteredWeight) / 100).toFixed(2)
      ),
      productId: this.selectedProduct().id,
      mealId: this.mealId(),
    };
  }
}
