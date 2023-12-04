export type Unit =
	| "tableSpoon"
	| "teaSpoon"
	| "gram"
	| "kiloGram"
	| "milliLiter"
	| "liter";

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
	sections: Section[];
}