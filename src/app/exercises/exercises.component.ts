import { Component, inject } from '@angular/core';
import { type Exercise } from './exercise.model';
import { ExercisesService } from './exercises.service';
import { RouterLink } from '@angular/router';
import { Table, TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { LoadingComponent } from '../common/loading/loading.component';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [
    RouterLink,
    TableModule,
    IconFieldModule,
    InputIconModule,
    ConfirmDialogModule,
    LoadingComponent,
  ],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.css',
})
export class ExercisesComponent {
  private exercisesService = inject(ExercisesService);
  private confirmationService = inject(ConfirmationService);
  exercises: Exercise[] = [];
  isLoading = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.loadExercises();
  }

  private loadExercises(): void {
    this.exercisesService.loadExercises().subscribe({
      next: (resData) => {
        this.exercises = resData;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching exercises:', error);
        this.isLoading = false;
      },
    });
  }

  confirmDelete(exerciseId: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this exercise?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.removeExercise(exerciseId);
      },
    });
  }

  removeExercise(exerciseId: number) {
    this.exercisesService.removeExercise(exerciseId).subscribe({
      next: () => {
        this.exercises = this.exercises.filter(
          (execise) => execise.id !== exerciseId
        );
      },
      error: (error) => {
        console.error('Error while removing exercise', exerciseId);
      },
    });
  }

  onGlobalFilter(event: Event, dt: Table) {
    const input = event.target as HTMLInputElement;
    dt.filterGlobal(input.value, 'contains');
  }
}
