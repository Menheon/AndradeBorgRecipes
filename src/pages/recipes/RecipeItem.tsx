// import { StrikeableStep } from "pages/recipes/StrikeableStep";
// import { mapUnitToStringFormat } from "util/util";
import { Recipe } from "@/types/models";
import { RemovableTag } from "./RemovableTag";

interface Props {
  recipe: Recipe;
}

export const RecipeItem = ({ recipe }: Props) => {
  return (
    <div className="mb-6 mx-12 border-darkSlateGrey border-2 grid grid-cols-8">
      <img
        className="w-full h-80 min-h-[100px] object-cover col-span-3"
        src={recipe.imageUrl}
      />
      <div className="px-12 py-8 col-span-5">
        <h2 className="text-5xl font-bold text-center p-4 text-darkGreen font-caveat tracking-wider">
          {recipe.name}
        </h2>
        <hr className="mb-4 border-t-2 border-darkSlateGrey" />

        <p className="text-lg">{recipe.description}</p>
        <div className="flex pt-8 gap-1">
          {recipe.tags.map((tag) => (
            <RemovableTag key={tag.id} isRemovable={false}>
              {tag.name}
            </RemovableTag>
          ))}
        </div>
        {/* {recipe.sections.map((section, i) => (
          <div className="grid grid-cols-2 gap-4" key={i}>
            <div className="bg-pastelGreen rounded-lg px-5 py-2">
              {recipe.sections.length > 1 && (
                <h3 className="item">{section.title}</h3>
              )}
              <div>
                <h4 className="text-md font-semibold uppercase text-darkGreen tracking-wider pb-2">
                  Ingredients
                </h4>
                <ul className="list-disc list-inside">
                  {section.ingredients.map((ingredientLine, i) => (
                    <li className="list-item pb-2 text-darkGreen" key={i}>
                      <span className="text-black">
                        {`${ingredientLine.amount} ${mapUnitToStringFormat(
                          ingredientLine.unit,
                        )} ${ingredientLine.ingredient.name}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-pastelGreen rounded-lg px-5 py-2">
              {recipe.sections.length > 1 && (
                <h3 className="item">{section.title}</h3>
              )}
              <h4 className="text-md font-semibold uppercase text-darkGreen tracking-wider pb-2">
                Steps
              </h4>
              <div>
                {section.steps.map((step, i) => (
                  <StrikeableStep key={i} step={step} />
                ))}
              </div>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};
