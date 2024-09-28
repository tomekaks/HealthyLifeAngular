import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Exercise } from '../../../../exercises/exercise.model';
import { DiaryService } from '../../../diary.service';
import { CreateWorkout } from '../../../models/workout.model';

@Component({
  selector: 'app-new-workout',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-workout.component.html',
  styleUrl: './new-workout.component.css',
})
export class NewWorkoutComponent {
  private diaryService = inject(DiaryService);
  selectedExercise = input.required<Exercise>();
  dailySumId = input.required<number>();
  @Output() close = new EventEmitter<void>();
  enteredMinutes: number = 0;

  onSubmit() {
    const newWorkout: CreateWorkout = {
      minutes: this.enteredMinutes,
      caloriesBurned:
        this.selectedExercise().caloriesPerHour * (this.enteredMinutes / 60),
      dailySumId: this.dailySumId(),
      exerciseId: this.selectedExercise().id,
    };

    console.log(newWorkout.dailySumId);
    this.diaryService.addWorkout(newWorkout).subscribe({
      next: () => {
        this.close.emit();
      },
      error: (error) => {
        console.error('Error while adding workout', error);
      },
    });
  }

  onCancel() {
    this.close.emit();
  }
}
