import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UpdateSupplement } from '../supplement.model';
import { SupplementsService } from '../supplements.service';
import { NgClass, CommonModule } from '@angular/common';
import { LoadingComponent } from '../../common/loading/loading.component';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-edit-supplement',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    RouterLink,
    LoadingComponent,
    DropdownModule,
    CommonModule,
  ],
  templateUrl: './edit-supplement.component.html',
  styleUrls: ['./edit-supplement.component.css'],
})
export class EditSupplementComponent implements OnInit {
  private supplementsService = inject(SupplementsService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  supplementId: number = Number(
    this.route.snapshot.paramMap.get('supplementId')
  );
  isLoading = false;

  supplementForm: FormGroup = new FormGroup({});

  servingForms = [
    { label: 'Powder', value: 'Powder' },
    { label: 'Capsule', value: 'Capsule' },
    { label: 'Tablet', value: 'Tablet' },
    { label: 'Liquid', value: 'Liquid' },
  ];

  servingUnits = [
    { label: 'Grams (g)', value: 'gram' },
    { label: 'Milliliters (ml)', value: 'ml' },
    { label: 'Capsule', value: 'capsule' },
    { label: 'Tablet', value: 'tablet' },
  ];

  categories = [
    { label: 'Protein', value: 'Protein' },
    { label: 'Vitamins', value: 'Vitamins' },
    { label: 'Minerals', value: 'Minerals' },
    { label: 'Herbs', value: 'Herbs' },
  ];

  ngOnInit(): void {
    this.isLoading = true;
    this.initializeForm();
    this.loadSupplement();
  }

  private initializeForm(): void {
    this.supplementForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      servingForm: ['', [Validators.required]],
      servingUnit: ['', [Validators.required]],
      servingSize: [0, [Validators.required, Validators.min(0)]],
      servings: [0, [Validators.required, Validators.min(0)]],
      totalQuantity: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
      pricePerServing: [{ value: 0, disabled: true }],
    });
  }

  private loadSupplement(): void {
    this.supplementsService.fetchSupplement(this.supplementId).subscribe({
      next: (supplement) => {
        this.supplementForm.patchValue(supplement);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching supplement data:', error);
        this.isLoading = false;
      },
    });
  }

  calculatePricePerServing(servings: number, price: number): number {
    return servings > 0 ? Number((price / servings).toFixed(2)) : 0;
  }

  onSubmit(): void {
    if (this.supplementForm.invalid) {
      return;
    }

    const formValues = this.supplementForm.value;

    const updatedSupplement: UpdateSupplement = {
      ...formValues,
      id: this.supplementId,
      pricePerServing: this.calculatePricePerServing(
        formValues.servings,
        formValues.price
      ),
    };
    this.supplementsService.updateSupplement(updatedSupplement).subscribe({
      next: () => {
        this.router.navigateByUrl('/supplements');
      },
      error: (error) => {
        console.error('Error while updating supplement', error);
      },
    });
  }
}
