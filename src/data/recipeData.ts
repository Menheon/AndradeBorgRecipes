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
            name: "Garlic cloves",
            amount: 4,
            unit: "none",
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
  {
    title: "Mom's Sausage Dish",
    tags: ["Danish", "Pasta"],
    sections: [
      {
        title: "Pasta",
        ingredients: [
          {
            name: "Grated mozzarella",
            amount: 1,
            unit: "handful",
          },
          {
            name: "Bouillon cubes",
            amount: 2,
            unit: "none",
          },
          {
            name: "Macaroni",
            amount: 500,
            unit: "gram",
          },
          {
            name: "Eggs",
            amount: 2,
            unit: "none",
          },
          {
            name: "Butter",
            amount: 1,
            unit: "tableSpoon",
          },
          {
            name: "All-round grill spice",
            amount: 1,
            unit: "tableSpoon",
          },
          {
            name: "Vienna Sausages",
            amount: 250,
            unit: "gram",
          },
        ],
        steps: [
          "Skær pølserne i skiver.",
          "Steg pølserne til de er brunet.",
          "Hæld vand og bouillonterninger i en stor gryde og bring det i kog.",
          "Kog makaronien i tiden på pakken.",
          "Pisk de to æg sammen.",
          "Når pastaen er klar, hældes vandet fra og gryden sættes tilbage på varmen.",
          "Her tilsættes ost, pølser, æg og grillkrydderi.",
          "Rør godt rundt i retten for at få smeltet osten og varmet æggemassen.",
        ],
      },
    ],
  },
];
