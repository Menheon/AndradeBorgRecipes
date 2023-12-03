interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

interface Section {
  title: string;
  ingredients: Ingredient[];
  steps: string[];
}

interface Recipe {
  title: string;
  sections: Section[];
}

export const Home = () => {
  const darkGreen = "#98ae2e";
  const pastelGreen = "#f4f6eb";

  const recipes: Recipe[] = [
    {
      title: "Tomatsuppe m. Suppehorn",
      sections: [
        {
          title: "Tomatsuppe",
          ingredients: [
            {
              amount: 2,
              unit: "spsk",
              name: "olivenolie",
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
      <h1 className="text-lime-500 font-bold text-xl">
        Andrade & Borg Recipes
      </h1>
      <div>
        {recipes.map((recipe) => (
          <div>
            <h2>{recipe.title}</h2>
            {recipe.sections.map((section) => (
              <div>
                <h3>{recipe.sections.length > 1 && section.title}</h3>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
