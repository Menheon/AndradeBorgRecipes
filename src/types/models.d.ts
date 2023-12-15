export type Unit =
  | "tableSpoon"
  | "teaSpoon"
  | "gram"
  | "kiloGram"
  | "milliLiter"
  | "liter"
  | "can"
  | "handful"
  | "none";

export interface Tag {
  name: string;
}

export interface Ingredient {
  name: string;
}

export interface IngredientLine {
  ingredient: Ingredient;
  amount: number;
  unit: Unit;
}

export interface Section {
  title: string;
  ingredients: IngredientLine[];
  steps: string[];
}

export interface Recipe {
  name: string;
  tags: Tag[];
  sections: Section[];
}
