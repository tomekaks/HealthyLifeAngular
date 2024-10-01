import { Component, inject, OnInit } from '@angular/core';
import { CreateSupplement } from '../supplement.model';
import { SupplementsService } from '../supplements.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { RouterLink } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-new-supplement',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PanelModule,
    InputTextModule,
    InputNumberModule,
    RouterLink,
    DropdownModule,
    NgClass,
    NgIf,
    NgFor,
  ],
  templateUrl: './new-supplement.component.html',
  styleUrl: './new-supplement.component.css',
})
export class NewSupplementComponent implements OnInit {
  private supplementsService = inject(SupplementsService);
  private formBuilder = inject(FormBuilder);
  supplementForm: FormGroup = new FormGroup({});

  servingForms = [
    { label: 'Powder', value: 'Powder' },
    { label: 'Capsule', value: 'Capsule' },
    { label: 'Tablet', value: 'Tablet' },
    { label: 'Liquid', value: 'Liquid' },
  ];

  servingUnits = [
    { label: 'Grams (g)', value: 'g' },
    { label: 'Milliliters (ml)', value: 'ml' },
    { label: 'Capsule', value: 'Capsule' },
    { label: 'Tablet', value: 'Tablet' },
  ];

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.supplementForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required, Validators.minLength(2)]],
      servingForm: ['', [Validators.required]],
      servingUnit: ['', [Validators.required]],
      servingSize: [0, [Validators.required, Validators.min(0)]],
      servings: [0, [Validators.required, Validators.min(0)]],
      totalQuantity: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
    });
  }

  // enteredName = '';
  // enteredCategory = '';
  // enteredServingForm = '';
  // enteredServingUnit = '';
  // enteredServingSize = 0;
  // enteredServings = 0;
  // enteredTotalQuantity = 0;
  // enteredPrice = 0;

  calculatePricePerServing(servings: number, price: number): number {
    return servings > 0 ? Number((price / servings).toFixed(2)) : 0;
  }

  onSubmit() {
    const newSupplement: CreateSupplement = {
      name: this.supplementForm.value['name'],
      category: this.supplementForm.value['category'],
      servingForm: this.supplementForm.value['servingForm'],
      servingUnit: this.supplementForm.value['servingUnit'],
      servingSize: this.supplementForm.value['servingSize'],
      servings: this.supplementForm.value['servings'],
      totalQuantity: this.supplementForm.value['totalQuantity'],
      price: this.supplementForm.value['price'],
      pricePerServing: this.calculatePricePerServing(
        this.supplementForm.value['servings'],
        this.supplementForm.value['price']
      ),
      createdBy: '',
    };

    this.supplementsService.addSupplement(newSupplement).subscribe({
      next: () => {},
      error: (error) => {
        console.error('Error while adding supplement', error);
      },
    });
  }
}
