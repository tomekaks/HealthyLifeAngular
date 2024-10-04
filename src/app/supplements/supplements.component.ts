import { Component, inject, OnInit } from '@angular/core';
import { SupplementsService } from './supplements.service';
import { Supplement } from './supplement.model';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-supplements',
  standalone: true,
  imports: [
    TableModule,
    RouterLink,
    CurrencyPipe,
    IconFieldModule,
    InputIconModule,
  ],
  templateUrl: './supplements.component.html',
  styleUrl: './supplements.component.css',
})
export class SupplementsComponent implements OnInit {
  private supplementsService = inject(SupplementsService);
  supplements: Supplement[] = [];

  ngOnInit(): void {
    this.supplementsService.fetchSupplements().subscribe({
      next: (resData) => {
        this.supplements = resData;
      },
      error: (error) => {
        console.error('Error fetching supplements:', error);
      },
    });
  }

  deleteSupplement(supplementId: number) {
    this.supplementsService.removeSupplement(supplementId).subscribe({
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
