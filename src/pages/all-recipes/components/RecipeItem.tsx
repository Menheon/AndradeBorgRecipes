import { Recipe } from "@/types/models";
import { RemovableTag } from "./RemovableTag";
import { generatePath, useNavigate } from "react-router-dom";
import { RECIPE_ITEM_PATH } from "@/shared/AppRoutes";
import { flushSync } from "react-dom";

interface Props {
  recipe: Recipe;
}

export const RecipeItem = ({ recipe }: Props) => {
  const navigate = useNavigate();

  const onRecipeItemClicked = () => {
    if (!recipe.id) return;
    const path = generatePath(RECIPE_ITEM_PATH, { recipeId: recipe.id });
    document.startViewTransition(() => flushSync(() => navigate(path)));
  };

  return (
    <button
      className="bg-cream-100 hover:bg-cream-200 flex cursor-pointer flex-col items-center rounded-xl border-2 border-brown-600 shadow-lg transition focus-visible:base-outline active:scale-[98.75%]"
      onClick={onRecipeItemClicked}
    >
      <img
        className="h-56 w-full rounded-t-lg border-b-2 border-brown-600 object-cover md:h-64"
        src={recipe.imageUrl}
        alt={recipe.name}
        style={{
          viewTransitionName: `recipe-img-${recipe.id}`,
        }}
      />
      <h2 className="flex-1 p-2 text-center font-caveat text-4xl font-bold tracking-wider">
        {recipe.name}
      </h2>
      <div className="flex w-full flex-col p-4 lg:p-6 ">
        <p className="line-clamp-3 h-20 text-justify text-lg md:line-clamp-4 md:h-28">
          {recipe.description}
        </p>
        <div className="mb-0 mt-auto flex gap-1 pt-2">
          {recipe.tags.map((tag) => (
            <RemovableTag key={tag.id} isRemovable={false}>
              {tag.name}
            </RemovableTag>
          ))}
        </div>
      </div>
    </button>
  );
};
