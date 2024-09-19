import { Exercise } from '../../exercises/exercise.model';

export interface Workout {
  id: number;
  dailySumId: number;
  caloriesBurned: number;
  minutes: number;
  exercise: Exercise;
}

export interface CreateWorkout {
  dailySumId: number;
  caloriesBurned: number;
  minutes: number;
  exerciseId: number;
}
