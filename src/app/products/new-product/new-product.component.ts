import { Component, inject, OnInit, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductsService } from '../products.service';
import { CreateProduct } from '../product.model';
import { NgClass, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgClass, NgIf],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css',
})
export class NewProductComponent implements OnInit {
  private productsService = inject(ProductsService);
  private formBuilder = inject(FormBuilder);

  productForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      calories: [0, [Validators.required, Validators.min(0)]],
      proteins: [0, [Validators.required, Validators.min(0)]],
      carbs: [0, [Validators.required, Validators.min(0)]],
      fats: [0, [Validators.required, Validators.min(0)]],
      fiber: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
      weight: [0, [Validators.required, Validators.min(0)]],
    });
  }

  calculatePricePer100g(weight: number, price: number): number {
    return weight > 0 ? Number((price / (weight / 100)).toFixed(2)) : 0;
  }

  onSubmit() {
    if (this.productForm.invalid) {
      return;
    }

    const formValues = this.productForm.value;

    const newProduct: CreateProduct = {
      ...formValues,
      price: this.calculatePricePer100g(formValues.weight, formValues.price),
      createdBy: '',
    };

    this.productsService.addProduct(newProduct).subscribe({
      next: () => {},
      error: (error) => {
        console.error('Error while adding product', error);
      },
    });
  }
}
