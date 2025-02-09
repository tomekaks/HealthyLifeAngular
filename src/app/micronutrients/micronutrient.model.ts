export interface Micronutrient {
  id: number;
  name: string;
  dailyRecomendedIntakeMg: number;
  dailyIntakeLimitMg: number;
}

export interface CreateMicronutrient {
  name: string;
  dailyRecomendedIntakeMg: number;
  dailyIntakeLimitMg: number;
}

export interface UpdateMicronutrient {
  id: number;
  dailyRecomendedIntakeMg: number;
  dailyIntakeLimitMg: number;
}
