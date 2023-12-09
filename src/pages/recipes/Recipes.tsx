import { recipes } from "data/recipeData";
import { RecipeItem } from "./RecipeItem";
import { useState } from "react";

export const Recipes = () => {
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  const onSearchInputValueChanged = (newValue: string) => {
    if (newValue === "") {
      return setFilteredRecipes(recipes);
    }
    const searchValue = newValue.toLowerCase();

    const newFilteredRecipes = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchValue),
    );
    setFilteredRecipes(newFilteredRecipes);
  };

  return (
    <div className="container mx-auto  bg-white p-4 flex-col justify-center">
      <div className="rounded-md bg-pastelGreen p-4">
        <div className="flex gap-1 flex-col">
          <label htmlFor="search" className="text-darkGreen font-semibold">
            Search
          </label>
          <input
            id="search"
            className="px-2 border-solid border-darkGreen border-2 rounded-md hover:border-darkerGreen focus:outline-darkerGreen"
            onChange={(event) => onSearchInputValueChanged(event.target.value)}
          />
        </div>
        <p>
          {filteredRecipes.length} recipe
          {filteredRecipes.length === 1 ? "" : "s"} found
        </p>
      </div>
      <div>
        {filteredRecipes.map((recipe) => (
          <RecipeItem recipe={recipe} key={recipe.title} />
        ))}
      </div>
    </div>
  );
};
