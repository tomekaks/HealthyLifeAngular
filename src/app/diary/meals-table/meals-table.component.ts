import { Component } from '@angular/core';
import { MealRowComponent } from './meal-row/meal-row.component';

@Component({
  selector: 'app-meals-table',
  standalone: true,
  imports: [MealRowComponent],
  templateUrl: './meals-table.component.html',
  styleUrl: './meals-table.component.css',
})
export class MealsTableComponent {}
