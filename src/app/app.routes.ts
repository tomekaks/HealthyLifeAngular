import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { DiaryComponent } from './diary/diary.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'exercises', component: ExercisesComponent },
  { path: 'diary', component: DiaryComponent },
];
