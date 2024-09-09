import { Component } from '@angular/core';
import { type Exercise } from './exercise.model';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.css',
})
export class ExercisesComponent {
  exercises: Exercise[] = [];
}
