import { Component, inject } from '@angular/core';
import { MicronutrientsService } from './micronutrients.service';
import { Micronutrient } from './micronutrient.model';
import { Table, TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-micronutrients',
  standalone: true,
  imports: [TableModule, RouterLink],
  templateUrl: './micronutrients.component.html',
  styleUrl: './micronutrients.component.css',
})
export class MicronutrientsComponent {
  private micronutrientsService = inject(MicronutrientsService);
  micronutrients: Micronutrient[] = [];

  ngOnInit(): void {
    this.micronutrientsService.fetchAll().subscribe({
      next: (resData) => {
        this.micronutrients = resData;
      },
      error: (error) => {
        console.error('Error fetching supplements:', error);
      },
    });
  }

  deleteMicronutrient(micronutrientId: number) {
    this.micronutrientsService.remove(micronutrientId).subscribe({
      error: (error) => {
        console.error('Error while removing supplement', error);
      },
    });
  }

  onGlobalFilter(event: Event, dt: Table) {
    const input = event.target as HTMLInputElement;
    dt.filterGlobal(input.value, 'contains');
  }
}
