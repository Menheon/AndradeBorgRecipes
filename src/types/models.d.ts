export type Unit =
  | "tableSpoon"
  | "teaSpoon"
  | "gram"
  | "kiloGram"
  | "milliLiter"
  | "liter"
  | "can"
  | "cloves"
  | "none";

export interface Ingredient {
  name: string;
  amount: number;
  unit: Unit;
}

export interface Section {
  title: string;
  ingredients: Ingredient[];
  steps: string[];
}

export interface Recipe {
  title: string;
  tags: string[];
  sections: Section[];
}
