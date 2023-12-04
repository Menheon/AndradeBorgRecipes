import { Recipe } from "types/models";

export const recipes: Recipe[] = [
  {
    title: "Tomato Soup with Macaroni",
    tags: ["Danish", "Soup", "Hot", "Pasta"],
    sections: [
      {
        title: "Tomato Soup",
        ingredients: [
          {
            name: "Olive oil",
            unit: "tableSpoon",
            amount: 2,
          },
          {
            name: "Tomato puree",
            amount: 2,
            unit: "tableSpoon",
          },
          {
            name: "Chopped tomatoes",
            amount: 2,
            unit: "can",
          },
          {
            name: "Onion",
            amount: 1,
            unit: "none",
          },
          {
            name: "Garlic",
            amount: 4,
            unit: "cloves",
          },
          {
            name: "Bacon",
            amount: 6,
            unit: "none",
          },
          {
            name: "Carrot",
            amount: 2,
            unit: "none",
          },
          {
            name: "Bouillon Cube",
            amount: 1,
            unit: "none",
          },
          {
            name: "Sugar",
            amount: 2,
            unit: "teaSpoon",
          },
          {
            name: "Water",
            amount: 500,
            unit: "milliLiter",
          },
          {
            name: "Basil",
            amount: 1,
            unit: "teaSpoon",
          },
          {
            name: "Oregano",
            amount: 1,
            unit: "teaSpoon",
          },
          {
            name: "Cream",
            amount: 250,
            unit: "milliLiter",
          },
        ],
        steps: [
          "Steg baconen, indtil den er sprød. Fjern det fra gryden og lad baconfedtet blive.",
          "Sautér løg og hvidløg i baconfedtet.",
          "Tilsæt de hakkede tomater, bouillonterningen, vand, sukker, tomatpuré, basilikum og oregano.",
          "Bring det i kog. Simrer suppen i ca. 20-25 minutter.",
          "Hvis du bruger frisk basilikum, tilsæt det mod slutningen. Hvis du bruger tørret basilikum, tilsæt det tidligere.",
          "Brug en blender til at purere suppen, indtil den er ensartet og glat.",
          "Tilsæt fløde eller mælk, og varm den op. Smag til med salt og peber.",
          "Server med suppehorn",
        ],
      },
    ],
  },
];
