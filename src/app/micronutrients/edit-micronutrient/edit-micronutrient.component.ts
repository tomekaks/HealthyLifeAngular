import { Component, inject, OnInit } from '@angular/core';
import { MicronutrientsService } from '../micronutrients.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UpdateMicronutrient } from '../micronutrient.model';
import { CommonModule, NgClass } from '@angular/common';
import { LoadingComponent } from '../../common/loading/loading.component';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-edit-micronutrient',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    RouterLink,
    LoadingComponent,
    DropdownModule,
    CommonModule,
  ],
  templateUrl: './edit-micronutrient.component.html',
  styleUrl: './edit-micronutrient.component.css',
})
export class EditMicronutrientComponent implements OnInit {
  private micronutrientsService = inject(MicronutrientsService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  micronutrientId: number = Number(
    this.route.snapshot.paramMap.get('micronutrientId')
  );
  isLoading = false;

  micronutrientForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.isLoading = true;
    this.initializeForm();
    this.loadMicronutrient();
  }

  private initializeForm(): void {
    this.micronutrientForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      dailyRecomendedIntakeMg: [0, [Validators.required, Validators.min(0)]],
      dailyIntakeLimitMg: [0, [Validators.required, Validators.min(0)]],
    });
  }

  private loadMicronutrient(): void {
    this.micronutrientsService.fetch(this.micronutrientId).subscribe({
      next: (micronutrient) => {
        this.micronutrientForm.patchValue(micronutrient);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching micronutrient data:', error);
        this.isLoading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.micronutrientForm.invalid) {
      return;
    }

    const formValues = this.micronutrientForm.value;

    const updatedMicronutrient: UpdateMicronutrient = {
      ...formValues,
      id: this.micronutrientId,
    };
    this.micronutrientsService.update(updatedMicronutrient).subscribe({
      next: () => {
        this.router.navigateByUrl('/micronutrients');
      },
      error: (error) => {
        console.error('Error while updating micronutrient', error);
      },
    });
  }
}
