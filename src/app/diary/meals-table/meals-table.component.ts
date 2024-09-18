import { Component, OnInit } from '@angular/core';
import { MealRowComponent } from './meal-row/meal-row.component';
import { DiaryService } from '../diary.service';
import { DailySum } from '../models/dailySum.model';
import { MealItemRowComponent } from './meal-row/meal-item-row/meal-item-row.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-meals-table',
  standalone: true,
  imports: [MealRowComponent, MealItemRowComponent, RouterLink],
  templateUrl: './meals-table.component.html',
  styleUrl: './meals-table.component.css',
})
export class MealsTableComponent implements OnInit {
  dailySum!: DailySum;
  constructor(private diaryService: DiaryService) {}

  ngOnInit(): void {
    this.dailySum = this.diaryService.dailySum();
    console.log(this.dailySum);
  }
}
