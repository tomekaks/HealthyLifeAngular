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
