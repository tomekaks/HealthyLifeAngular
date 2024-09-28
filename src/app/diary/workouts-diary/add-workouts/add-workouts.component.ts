import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewWorkoutComponent } from './new-workout/new-workout.component';
import { ExercisesService } from '../../../exercises/exercises.service';
import { Exercise } from '../../../exercises/exercise.model';

@Component({
  selector: 'app-add-workouts',
  standalone: true,
  imports: [NewWorkoutComponent],
  templateUrl: './add-workouts.component.html',
  styleUrl: './add-workouts.component.css',
})
export class AddWorkoutsComponent implements OnInit {
  private exercisesService = inject(ExercisesService);
  private route = inject(ActivatedRoute);
  dailySumId: number = Number(this.route.snapshot.paramMap.get('dailySumId'));
  exercises: Exercise[] = [];
  isAddingWorkout = false;
  selectedExercise!: Exercise;

  ngOnInit(): void {
    console.log(this.dailySumId);
    this.fetchProducts();
  }

  onStartAddWorkout(exercise: Exercise) {
    this.selectedExercise = exercise;
    this.isAddingWorkout = true;
  }

  onCloseAddWorkout() {
    this.isAddingWorkout = false;
  }

  private fetchProducts() {
    console.log('fetching products');
    this.exercisesService.loadExercises().subscribe({
      next: (resData) => {
        this.exercises = resData;
      },
      error: (error) => {
        console.error('Error fetching exercises:', error);
      },
    });
  }
}
