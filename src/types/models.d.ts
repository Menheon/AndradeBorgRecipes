export type Unit =
  | "tableSpoon"
  | "teaSpoon"
  | "gram"
  | "kiloGram"
  | "milliLiter"
  | "liter"
  | "can"
  | "handful"
  | "bottle"
  | "piece";

export interface Tag {
  name: string;
  id: string;
}

export interface Ingredient {
  name: string;
  id?: string;
}

export interface IngredientLine {
  ingredient: Ingredient;
  amount: number | undefined;
  unit: Unit | undefined;
  id?: string;
}

export interface Section {
  title: string;
  ingredients: IngredientLine[];
  steps: string[];
  id?: string;
}

export interface Recipe {
  name: string;
  description: string;
  imageUrl: string;
  tags: Tag[];
  sections: Section[];
  id?: string;
  creationDate: Date;
}

export type PlatformSupportedLanguages = "da" | "en";

export type User = {
  isAdmin: boolean;
  id: string;
  email: string;
  preferredLanguage: PlatformSupportedLanguages;
};
