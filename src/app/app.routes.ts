import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { authGuard } from './auth/auth.guard';
import { FoodDiaryComponent } from './diary/food-diary/food-diary.component';
import { WorkoutsDiaryComponent } from './diary/workouts-diary/workouts-diary.component';
import { UpdateGoalsComponent } from './diary/update-goals/update-goals.component';
import { AddMealItemsComponent } from './diary/food-diary/add-meal-items/add-meal-items.component';
import { AddWorkoutsComponent } from './diary/workouts-diary/add-workouts/add-workouts.component';
import { SupplementsComponent } from './supplements/supplements.component';
import { NewSupplementComponent } from './supplements/new-supplement/new-supplement.component';
import { NewProductComponent } from './products/new-product/new-product.component';
import { NewExerciseComponent } from './exercises/new-exercise/new-exercise.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { EditExerciseComponent } from './exercises/edit-exercise/edit-exercise.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {
        path: 'products',
        component: ProductsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'products/new-product',
        component: NewProductComponent,
        canActivate: [authGuard],
      },
      {
        path: 'products/edit-product/:productId',
        component: EditProductComponent,
        canActivate: [authGuard],
      },
      {
        path: 'exercises',
        component: ExercisesComponent,
        canActivate: [authGuard],
      },
      {
        path: 'exercises/new-exercise',
        component: NewExerciseComponent,
        canActivate: [authGuard],
      },
      {
        path: 'exercises/edit-exercise/:exerciseId',
        component: EditExerciseComponent,
        canActivate: [authGuard],
      },
      {
        path: 'supplements',
        component: SupplementsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'supplements/new-supplement',
        component: NewSupplementComponent,
        canActivate: [authGuard],
      },
      {
        path: 'diary/food',
        component: FoodDiaryComponent,
        canActivate: [authGuard],
      },
      {
        path: 'diary/workouts',
        component: WorkoutsDiaryComponent,
        canActivate: [authGuard],
      },
      {
        path: 'diary/update-goals',
        component: UpdateGoalsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'diary/food/add-meal-items/:mealId',
        component: AddMealItemsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'diary/workouts/add-workouts/:dailySumId',
        component: AddWorkoutsComponent,
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];
