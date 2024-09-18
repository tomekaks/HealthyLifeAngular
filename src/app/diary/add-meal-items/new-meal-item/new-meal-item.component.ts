import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../products/product.model';

@Component({
  selector: 'app-new-meal-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-meal-item.component.html',
  styleUrl: './new-meal-item.component.css',
})
export class NewMealItemComponent {
  @Input() product!: Product;
  enteredWeight: number = 0;

  onSubmit() {}

  onCancel() {}
}
