import { Component, inject, input, output } from '@angular/core';
import { DiaryService } from '../diary.service';
import { DailyGoal } from '../models/dailyGoal.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-goals',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-goals.component.html',
  styleUrl: './update-goals.component.css',
})
export class UpdateGoalsComponent {
  private diaryService = inject(DiaryService);
  dailyGoals = input.required<DailyGoal>();
  cancel = output();

  onSubmit() {
    this.diaryService.updateDailyGoal(this.dailyGoals()).subscribe({
      next: () => {
        this.cancel.emit();
      },
    });
  }

  onCancel() {
    this.cancel.emit();
  }
}
