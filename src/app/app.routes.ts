import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { DiaryComponent } from './diary/diary.component';
import { HomeComponent } from './home/home.component';
import { AddMealItemsComponent } from './diary/add-meal-items/add-meal-items.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'exercises', component: ExercisesComponent },
  {
    path: 'diary',
    component: DiaryComponent,
  },
  {
    path: 'add-meal-items/:mealId',
    component: AddMealItemsComponent,
  },
];
