import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExercisesService } from '../exercises.service';
import { CreateExercise } from '../exercise.model';

@Component({
  selector: 'app-new-exercise',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-exercise.component.html',
  styleUrl: './new-exercise.component.css',
})
export class NewExerciseComponent {
  @Output() close = new EventEmitter<void>();
  enteredName = '';
  enteredCalories = 0;
  private exercisesService = inject(ExercisesService);
  private destroyRef = inject(DestroyRef);

  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    const newExercise: CreateExercise = {
      name: this.enteredName,
      caloriesPerHour: this.enteredCalories,
      createdBy: '',
    };

    const subscription = this.exercisesService
      .addExercise(newExercise)
      .subscribe({
        error: (error) => {
          console.error('Error while adding exercise', newExercise);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });

    this.close.emit();
  }
}
