import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { DiaryComponent } from './diary/diary.component';
import { HomeComponent } from './home/home.component';
import { AddMealItemsComponent } from './diary/add-meal-items/add-meal-items.component';
import { AddWorkoutsComponent } from './diary/add-workouts/add-workouts.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { authGuard } from './auth/auth.guard';
import { FoodDiaryComponent } from './diary/food-diary/food-diary.component';
import { WorkoutsDiaryComponent } from './diary/workouts-diary/workouts-diary.component';
import { UpdateGoalsComponent } from './diary/update-goals/update-goals.component';

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
        path: 'exercises',
        component: ExercisesComponent,
        canActivate: [authGuard],
      },
      {
        path: 'diary',
        component: DiaryComponent,
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
        path: 'diary/add-meal-items/:mealId',
        component: AddMealItemsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'diary/add-workouts/:dailySumId',
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
