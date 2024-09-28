import { Component, inject, input, OnInit } from '@angular/core';
import { MealRowComponent } from './meal-row/meal-row.component';
import { MealItemRowComponent } from './meal-row/meal-item-row/meal-item-row.component';
import { RouterLink } from '@angular/router';
import { Meal } from '../../models/meal.model';
import { DiaryService } from '../../diary.service';

@Component({
  selector: 'app-meals-table',
  standalone: true,
  imports: [MealRowComponent, MealItemRowComponent, RouterLink],
  templateUrl: './meals-table.component.html',
  styleUrl: './meals-table.component.css',
})
export class MealsTableComponent {
  meals = input.required<Meal[]>();
  private diaryService = inject(DiaryService);

  removeMealItem(itemId: number) {
    this.diaryService.removeMealItem(itemId).subscribe();
  }
}
