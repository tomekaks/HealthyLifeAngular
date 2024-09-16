import { Component } from '@angular/core';
import { MealItemRowComponent } from './meal-item-row/meal-item-row.component';
import { MealTotalsRowComponent } from './meal-totals-row/meal-totals-row.component';

@Component({
  selector: 'app-meal-row',
  standalone: true,
  imports: [MealItemRowComponent, MealTotalsRowComponent],
  templateUrl: './meal-row.component.html',
  styleUrl: './meal-row.component.css',
})
export class MealRowComponent {}
