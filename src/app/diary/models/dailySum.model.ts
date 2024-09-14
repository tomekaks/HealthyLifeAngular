import { Meal } from './meal.model';
import { Workout } from './workout.model';

export interface DailySum {
  id: number;
  userId: string;
  date: string;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  fiber: number;
  price: number;
  caloriesBurned: number;
  meals: Meal[];
  workouts: Workout[];
}
