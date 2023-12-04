import { recipes } from "data/recipeData";
import { RecipeItem } from "./RecipeItem";

export const Recipes = () => {
  return (
    <div className="container mx-auto  bg-white p-4 flex-col justify-center">
      <div>
        {recipes.map((recipe) => (
          <RecipeItem recipe={recipe} key={recipe.title} />
        ))}
      </div>
    </div>
  );
};
