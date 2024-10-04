import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Exercise } from '../exercise.model';
import { ExercisesService } from '../exercises.service';
import { NgClass, CommonModule } from '@angular/common';
import { LoadingComponent } from '../../common/loading/loading.component';

@Component({
  selector: 'app-edit-exercise',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    RouterLink,
    LoadingComponent,
    CommonModule,
  ],
  templateUrl: './edit-exercise.component.html',
  styleUrls: ['./edit-exercise.component.css'],
})
export class EditExerciseComponent implements OnInit {
  private exercisesService = inject(ExercisesService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  exerciseId: number = Number(this.route.snapshot.paramMap.get('exerciseId'));
  isLoading = false;

  exerciseForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.isLoading = true;
    this.initializeForm();
    this.loadExercise();
  }

  private initializeForm(): void {
    this.exerciseForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      caloriesPerHour: [0, [Validators.required, Validators.min(0)]],
    });
  }

  private loadExercise(): void {
    this.exercisesService.fetchExercise(this.exerciseId).subscribe({
      next: (exercise) => {
        this.exerciseForm.patchValue(exercise);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching exercise data:', error);
        this.isLoading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.exerciseForm.invalid) {
      return;
    }

    const formValues = this.exerciseForm.value;

    const updatedExercise: Exercise = {
      ...formValues,
      id: this.exerciseId,
    };

    this.exercisesService.updateExercise(updatedExercise).subscribe({
      next: () => {
        this.router.navigateByUrl('exercises');
      },
      error: (error) => {
        console.error('Error while updating exercise', error);
      },
    });
  }
}
