import { Component, inject, OnInit } from '@angular/core';
import { DiaryService } from '../diary.service';
import { DailyGoal } from '../models/dailyGoal.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-goals',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-goals.component.html',
  styleUrl: './update-goals.component.css',
})
export class UpdateGoalsComponent implements OnInit {
  private diaryService = inject(DiaryService);
  private router = inject(Router);
  dailyGoals: DailyGoal = {
    id: 0,
    userId: '',
    calories: 0,
    proteins: 0,
    carbs: 0,
    fats: 0,
    fiber: 0,
  };

  ngOnInit(): void {
    this.loadDailyGoal();
  }

  loadDailyGoal() {
    this.diaryService.fetchDailyGoal().subscribe({
      next: (resData) => {
        this.dailyGoals = resData;
      },
      error: (error) => {
        console.error('Error fetching dailyGoal:', error);
      },
    });
  }

  onSubmit() {
    this.diaryService.updateDailyGoal(this.dailyGoals).subscribe({
      next: () => {
        this.router.navigateByUrl('diary/food');
      },
    });
  }
}
