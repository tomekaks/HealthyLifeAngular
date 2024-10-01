import { Component, inject } from '@angular/core';
import { type Exercise } from './exercise.model';
import { ExercisesService } from './exercises.service';
import { NewExerciseComponent } from './new-exercise/new-exercise.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [NewExerciseComponent, RouterLink],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.css',
})
export class ExercisesComponent {
  exercises: Exercise[] = [];
  private exercisesService = inject(ExercisesService);

  ngOnInit(): void {
    this.exercisesService.loadExercises().subscribe({
      next: (resData) => {
        this.exercises = resData;
      },
      error: (error) => {
        console.error('Error fetching exercises:', error);
      },
    });
  }

  removeExercise(exerciseId: number) {
    this.exercisesService.removeExercise(exerciseId).subscribe({
      error: (error) => {
        console.error('Error while removing exercise', exerciseId);
      },
    });
  }
}
