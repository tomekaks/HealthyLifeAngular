export interface Exercise {
  id: number;
  name: string;
  caloriesPerHour: number;
  createdBy: string;
}

export interface CreateExercise {
  name: string;
  caloriesPerHour: number;
  createdBy: string;
}
