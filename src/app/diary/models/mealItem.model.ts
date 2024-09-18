import { Product } from '../../products/product.model';

export interface MealItem {
  id: number;
  mealId: number;
  weight: number;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  fiber: number;
  price: number;
  product: Product;
}

export interface CreateMealItem {
  weight: number;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  fiber: number;
  price: number;
  mealId: number;
  productId: number;
}
