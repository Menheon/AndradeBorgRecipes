import AddIcon from "assets/add.svg?react";
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

  const createNewRecipe = () => {};

  return (
    <div className="container mx-auto bg-white p-4 justify-center">
      <div className="flex gap-4">
        <div className="rounded-md bg-pastelGreen p-4 flex gap-1 flex-col w-36 h-28 justify-start">
          <label className="text-darkGreen font-semibold text-center">
            Create Recipe
          </label>
          <button
            className="self-center hover:bg-darkGreen hover:bg-opacity-30 w-10 h-10 flex justify-center items-center rounded-md"
            onClick={createNewRecipe}
          >
            <AddIcon className="fill-black" />
          </button>
        </div>

        <div className="rounded-md bg-pastelGreen p-4 flex gap-1 flex-col h-28">
          <label htmlFor="search" className="text-darkGreen font-semibold">
            Search
          </label>
          <input
            id="search"
            className="px-2 border-solid border-darkGreen border-2 rounded-md hover:border-darkerGreen focus:outline-darkerGreen"
            onChange={(event) => onSearchInputValueChanged(event.target.value)}
          />
          <p>
            {filteredRecipes.length} recipe
            {filteredRecipes.length === 1 ? "" : "s"} found
          </p>
        </div>
      </div>

      <div>
        {filteredRecipes.map((recipe) => (
          <RecipeItem recipe={recipe} key={recipe.title} />
        ))}
      </div>
    </div>
  );
};
