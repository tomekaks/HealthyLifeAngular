import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ExercisesService } from '../exercises.service';
import { CreateExercise } from '../exercise.model';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-exercise',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './new-exercise.component.html',
  styleUrl: './new-exercise.component.css',
})
export class NewExerciseComponent implements OnInit {
  private exercisesService = inject(ExercisesService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  exerciseForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.exerciseForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      caloriesPerHour: [0, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit() {
    if (this.exerciseForm.invalid) {
      return;
    }

    const newExercise: CreateExercise = {
      ...this.exerciseForm.value,
      createdBy: '',
    };

    this.exercisesService.addExercise(newExercise).subscribe({
      next: () => {
        this.router.navigateByUrl('exercises');
      },
      error: (error) => {
        console.error('Error while adding exercise', newExercise);
      },
    });
  }
}
