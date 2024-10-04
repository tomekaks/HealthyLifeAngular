import { Component, inject } from '@angular/core';
import { ProductsService } from '../products.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product, UpdateProduct } from '../product.model';
import { NgClass } from '@angular/common';
import { LoadingComponent } from '../../common/loading/loading.component';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink, LoadingComponent],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent {
  private productsService = inject(ProductsService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  productId: number = Number(this.route.snapshot.paramMap.get('productId'));
  isLoading = false;

  productForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.isLoading = true;
    this.initializeForm();
    this.laodProduct();
  }

  onSubmit() {
    if (this.productForm.invalid) {
      return;
    }

    const formValues = this.productForm.value;

    const product: UpdateProduct = {
      ...formValues,
      id: this.productId,
      price: this.calculatePricePer100g(formValues.weight, formValues.price),
    };

    this.productsService.updateProduct(product).subscribe({
      next: () => {
        this.router.navigateByUrl('products');
      },
      error: (error) => {
        console.error('Error while updating product', error);
      },
    });
  }

  private laodProduct() {
    this.productsService.getProduct(this.productId).subscribe({
      next: (product) => {
        this.productForm.patchValue({ ...product, price: 0 });
        this.isLoading = false;
      },
    });
  }

  private initializeForm() {
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

  // private initializeForm(product: Product) {
  //   this.productForm = this.formBuilder.group({
  //     name: [product?.name || '', [Validators.required]],
  //     calories: [product.calories, [Validators.required, Validators.min(0)]],
  //     proteins: [product.proteins, [Validators.required, Validators.min(0)]],
  //     carbs: [product.carbs, [Validators.required, Validators.min(0)]],
  //     fats: [product.fats, [Validators.required, Validators.min(0)]],
  //     fiber: [product.fiber, [Validators.required, Validators.min(0)]],
  //     price: [0, [Validators.required, Validators.min(0)]],
  //     weight: [0, [Validators.required, Validators.min(0)]],
  //   });
  //   console.log(this.productForm.controls);
  // }

  private calculatePricePer100g(weight: number, price: number): number {
    return weight > 0 ? Number((price / (weight / 100)).toFixed(2)) : 0;
  }
}
