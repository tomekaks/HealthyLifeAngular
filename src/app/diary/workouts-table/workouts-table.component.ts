import { Component, inject, input } from '@angular/core';
import { Workout } from '../models/workout.model';
import { DiaryService } from '../diary.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-workouts-table',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './workouts-table.component.html',
  styleUrl: './workouts-table.component.css',
})
export class WorkoutsTableComponent {
  workouts = input.required<Workout[]>();
  dailySumId = input.required<number>();
  private diaryService = inject(DiaryService);

  removeWorkout(workoutId: number) {
    this.diaryService.removeWorkout(workoutId).subscribe();
  }
}
