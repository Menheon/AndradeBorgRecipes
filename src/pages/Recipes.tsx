import { Recipe } from "../types/models";
import { mapUnitToStringFormat } from "../util/util";

export const Recipes = () => {
  // const darkGreen = "#98ae2e";
  // const pastelGreen = "#f4f6eb";

  const recipes: Recipe[] = [
    {
      title: "Tomatsuppe m. Suppehorn",
      tags: ["Danish", "Soup", "Hot", "Pasta"],
      sections: [
        {
          title: "Tomatsuppe",
          ingredients: [
            {
              name: "olivenolie",
              unit: "tableSpoon",
              amount: 2,
            },
            {
              name: "Hakkede tomater",
              amount: 2,
              unit: "can",
            },
          ],
          steps: [
            "Steg baconen, indtil den er sprød. Fjern det fra gryden og lad baconfedtet blive.",
          ],
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto  bg-white p-4">
      <h1 className="text-lime-500 font-bold text-xl">Recipes</h1>
      <div>
        {recipes.map((recipe) => (
          <div>
            <h2 className="text-lg font-bold">{recipe.title}</h2>
            {recipe.sections.map((section) => (
              <div>
                <h3>{recipe.sections.length > 1 && section.title}</h3>
                <div>
                  <h4 className="text-base font-semibold">Ingredients</h4>
                  {section.ingredients.map((ingredient) => (
                    <p>
                      {ingredient.name} {ingredient.amount}{" "}
                      {mapUnitToStringFormat(ingredient.unit)}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
