import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../products.service';
import { CreateProduct } from '../product.model';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css',
})
export class NewProductComponent {
  private productsService = inject(ProductsService);
  close = output<void>();

  enteredName = '';
  enteredCalories = 0;
  enteredProteins = 0;
  enteredCarbs = 0;
  enteredFats = 0;
  enteredFiber = 0;
  enteredPrice = 0;
  enteredWeight = 0;

  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    const newProduct: CreateProduct = {
      name: this.enteredName,
      calories: this.enteredCalories,
      proteins: this.enteredProteins,
      carbs: this.enteredCarbs,
      fats: this.enteredFats,
      fiber: this.enteredFiber,
      price: Number(
        (this.enteredPrice / (this.enteredWeight / 100)).toFixed(2)
      ),
      createdBy: '',
    };

    this.productsService.addProduct(newProduct).subscribe({
      next: () => {
        this.close.emit();
      },
      error: (error) => {
        console.error('Error while adding product', error);
      },
    });
  }
}
