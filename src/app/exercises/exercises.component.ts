import { Component, DestroyRef, inject } from '@angular/core';
import { type Exercise } from './exercise.model';
import { ExercisesService } from './exercises.service';
import { NewExerciseComponent } from './new-exercise/new-exercise.component';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [NewExerciseComponent],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.css',
})
export class ExercisesComponent {
  exercises: Exercise[] = [];
  isAddingExercise = false;
  private exercisesService = inject(ExercisesService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    console.log('fetching exercises');
    const subscription = this.exercisesService.loadExercises().subscribe({
      next: (resData) => {
        console.log(resData);
        this.exercises = resData;
      },
      error: (error) => {
        console.error('Error fetching exercises:', error);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onStartAddExercise() {
    this.isAddingExercise = true;
  }

  onCloseAddExercise() {
    this.isAddingExercise = false;
  }

  removeExercise(exerciseId: number) {
    const subscription = this.exercisesService
      .removeExercise(exerciseId)
      .subscribe({
        error: (error) => {
          console.error('Error while removing exercise', exerciseId);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
