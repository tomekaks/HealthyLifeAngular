export interface Supplement {
  id: number;
  name: string;
  category: string;
  servingForm: string;
  servingUnit: string;
  servingSize: number;
  servings: number;
  totalQuantity: number;
  price: number;
  pricePerServing: number;
  createdBy: string;
}

export interface CreateSupplement {
  name: string;
  category: string;
  servingForm: string;
  servingUnit: string;
  servingSize: number;
  servings: number;
  totalQuantity: number;
  price: number;
  pricePerServing: number;
  createdBy: string;
}

export interface UpdateSupplement {
  id: number;
  category: string;
  servingForm: string;
  servingUnit: string;
  servingSize: number;
  servings: number;
  totalQuantity: number;
  price: number;
  pricePerServing: number;
}
