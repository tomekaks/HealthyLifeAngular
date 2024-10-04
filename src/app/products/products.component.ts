import { Component, inject } from '@angular/core';
import { type Product } from './product.model';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductsService } from './products.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Table, TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NewProductComponent,
    CommonModule,
    RouterLink,
    TableModule,
    IconFieldModule,
    InputIconModule,
    ConfirmDialogModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  private productsService = inject(ProductsService);
  private confirmationService = inject(ConfirmationService);
  products: Product[] = [];

  ngOnInit(): void {
    this.productsService.loadProducts().subscribe({
      next: (resData) => {
        this.products = resData.map((product) => ({
          ...product,
          pricePerProteins: this.calculatePricePerProteins(product),
        }));
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  confirmDelete(productId: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this product?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      accept: () => {
        this.removeProduct(productId);
      },
      reject: () => {
        // this.messageService.add({ severity: 'info', summary: 'Cancelled', detail: 'You have cancelled the deletion' });
      },
    });
  }

  removeProduct(productId: number) {
    this.productsService.removeProduct(productId).subscribe({
      next: () => {
        this.products = this.products.filter((prod) => prod.id !== productId);
      },
      error: (error) => {
        console.error('Error while removing product', productId);
      },
    });
  }
  editProduct(product: Product) {}

  onGlobalFilter(event: Event, dt: Table) {
    const input = event.target as HTMLInputElement;
    dt.filterGlobal(input.value, 'contains');
  }

  private calculatePricePerProteins(product: Product): number {
    if (product.proteins && product.proteins > 0) {
      return (product.price / product.proteins) * 100;
    }
    return 0;
  }
}
