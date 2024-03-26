export type Unit =
  | "tableSpoon"
  | "teaSpoon"
  | "gram"
  | "kiloGram"
  | "milliLiter"
  | "liter"
  | "can"
  | "handful"
  | "piece";

export interface Tag {
  name: string;
  id: string;
}

export interface Ingredient {
  name: string;
}

export interface IngredientLine {
  ingredient: Ingredient;
  amount: number | undefined;
  unit: Unit | undefined;
}

export interface Section {
  title: string;
  ingredients: IngredientLine[];
  steps: string[];
}

export interface Recipe {
  name: string;
  description: string;
  imageUrl: string;
  tags: Tag[];
  sections: Section[];
}
