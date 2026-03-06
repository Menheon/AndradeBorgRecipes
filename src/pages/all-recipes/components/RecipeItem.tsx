import { Recipe } from "@/types/models";
import { RemovableTag } from "./RemovableTag";
import { generatePath, useNavigate } from "react-router-dom";
import { RECIPE_ITEM_PATH } from "@/shared/AppRoutes";
import { flushSync } from "react-dom";

interface Props {
  recipe: Recipe;
}

/**
 * Recipe card component with hover prefetching for faster navigation.
 * @param recipe - The recipe data to display
 */
export const RecipeItem = ({ recipe }: Props) => {
  const navigate = useNavigate();

  const onRecipeItemClicked = () => {
    if (!recipe.id) return;
    const path = generatePath(RECIPE_ITEM_PATH, { recipeId: recipe.id });
    document.startViewTransition(() => flushSync(() => navigate(path)));
  };

  return (
    <button
      className="group shadow-card focus-visible:base-outline hover:shadow-card-hover flex h-full min-h-105 flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:z-10 hover:scale-[1.02] active:scale-[0.98] md:min-h-115"
      onClick={onRecipeItemClicked}
    >
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-neutral-200 md:h-56">
        <img
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          src={recipe.imageUrl}
          alt={recipe.name}
          style={{
            viewTransitionName: `recipe-img-${recipe.id}`,
          }}
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-linear-to-t from-neutral-900/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h2 className="font-caveat mb-2 text-3xl leading-tight font-bold tracking-wide text-neutral-800 md:text-4xl">
          {recipe.name}
        </h2>
        <p className="mb-4 line-clamp-3 flex-1 text-left text-base leading-relaxed text-neutral-600">
          {recipe.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-2">
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
