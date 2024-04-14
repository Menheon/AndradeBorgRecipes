import { Recipe } from "@/types/models";
import { RemovableTag } from "./RemovableTag";
import { useMediaQuery } from "@/util/useMediaQuery";
import { generatePath, useNavigate } from "react-router-dom";
import { RECIPE_ITEM_PATH } from "@/shared/AppRoutes";

interface Props {
  recipe: Recipe;
}

export const RecipeItem = ({ recipe }: Props) => {
  const isMinLargeScreen = useMediaQuery("lg");
  const navigate = useNavigate();

  const onRecipeItemClicked = () => {
    if (!recipe.id) return;
    const path = generatePath(RECIPE_ITEM_PATH, { recipeId: recipe.id });
    navigate(path);
    // TODO: Use View Transitions API to make fancy animation.
    // document.startViewTransition(() => flushSync(() => navigate(path)));
  };

  return (
    <div onClick={() => onRecipeItemClicked()}>
      {isMinLargeScreen ? (
        <div className="mb-6 mx-12 border-brown-600 border-2 grid grid-cols-8 h-80 rounded-xl shadow-lg overflow-auto cursor-pointer hover:bg-brown-200 transition">
          <img
            className="w-full h-full min-h-[100px] object-cover col-span-3 border-brown-600 border-r-2"
            src={recipe.imageUrl}
          />
          <div className="px-12 py-8 col-span-5 flex-col flex">
            <h2 className="text-5xl font-bold text-center p-4 text-darkGreen font-caveat tracking-wider">
              {recipe.name}
            </h2>
            <hr className="mb-4 border-t-2 border-brown-600" />

            <p className="text-lg">{recipe.description}</p>
            <div className="flex gap-1 mb-0 mt-auto">
              {recipe.tags.map((tag) => (
                <RemovableTag key={tag.id} isRemovable={false}>
                  {tag.name}
                </RemovableTag>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-6 mx-12 border-brown-600 border-2 grid grid-cols-8 rounded-xl shadow-lg cursor-pointer hover:bg-brown-200 transition">
          <h2 className="p-4 col-span-8 text-5xl font-bold text-center text-darkGreen font-caveat tracking-wider">
            {recipe.name}
          </h2>
          <img
            className="w-full h-full max-h-56 object-cover col-span-8 border-brown-600 border-y-2"
            src={recipe.imageUrl}
          />
          <div className="p-8 col-span-8 flex-col flex">
            <p className="text-lg">{recipe.description}</p>
            <div className="flex gap-1 mb-0 mt-auto pt-2">
              {recipe.tags.map((tag) => (
                <RemovableTag key={tag.id} isRemovable={false}>
                  {tag.name}
                </RemovableTag>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
