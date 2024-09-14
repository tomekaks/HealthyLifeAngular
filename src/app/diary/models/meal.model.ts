import { MealItem } from './mealItem.model';

export interface Meal {
  id: number;
  dailySumId: number;
  name: string;
  weight: number;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  fiber: number;
  price: number;
  mealItems: MealItem[];
}
