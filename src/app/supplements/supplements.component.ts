import { Component, inject, OnInit } from '@angular/core';
import { SupplementsService } from './supplements.service';
import { Supplement } from './supplement.model';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-supplements',
  standalone: true,
  imports: [TableModule, RouterLink, CurrencyPipe],
  templateUrl: './supplements.component.html',
  styleUrl: './supplements.component.css',
})
export class SupplementsComponent implements OnInit {
  private supplementsService = inject(SupplementsService);
  supplements: Supplement[] = [];

  ngOnInit(): void {
    this.supplementsService.loadSupplements().subscribe({
      next: (resData) => {
        this.supplements = resData;
      },
      error: (error) => {
        console.error('Error fetching supplements:', error);
      },
    });
  }

  editSupplement(supplement: Supplement) {}

  deleteSupplement(supplementId: number) {
    this.supplementsService.removeSupplement(supplementId).subscribe({
      error: (error) => {
        console.error('Error while removing supplement', error);
      },
    });
  }
}
