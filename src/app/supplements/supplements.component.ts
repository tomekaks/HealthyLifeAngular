import { Component, inject, OnInit } from '@angular/core';
import { SupplementsService } from './supplements.service';
import { Supplement } from './supplement.model';
import { TableModule } from 'primeng/table';
import { NewSupplementComponent } from './new-supplement/new-supplement.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-supplements',
  standalone: true,
  imports: [TableModule, NewSupplementComponent, RouterLink],
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

  removeSupplement(supplementId: number) {
    this.supplementsService.removeSupplement(supplementId).subscribe({
      error: (error) => {
        console.error('Error while removing supplement', error);
      },
    });
  }
}
