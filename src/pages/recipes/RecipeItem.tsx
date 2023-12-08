import { StrikeableStep } from "pages/recipes/StrikeableStep";
import { mapUnitToStringFormat } from "util/util";
import { Recipe } from "types/models";

interface Props {
  recipe: Recipe;
}

export const RecipeItem = ({ recipe }: Props) => {
  return (
    <div className="mb-6">
      <h2 className="text-4xl font-bold text-center p-4 text-darkGreen font-caveat">
        {recipe.title}
      </h2>
      <hr className="mb-4 border-t-2 border-darkGreen" />
      {recipe.sections.map((section, i) => (
        <div className="grid grid-cols-2 gap-4" key={i}>
          <div className="bg-pastelGreen rounded-lg px-5 py-2">
            {recipe.sections.length > 1 && (
              <h3 className="item">{section.title}</h3>
            )}
            <div>
              <h4 className="text-md font-semibold uppercase text-darkGreen">
                Ingredients
              </h4>
              <ul className="list-disc list-inside">
                {section.ingredients.map((ingredient, i) => (
                  <li className="list-item pb-2" key={i}>
                    {`${ingredient.amount} ${mapUnitToStringFormat(
                      ingredient.unit,
                    )} ${ingredient.name}`}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-pastelGreen rounded-lg px-5 py-2">
            {recipe.sections.length > 1 && (
              <h3 className="item">{section.title}</h3>
            )}
            <h4 className="text-md font-semibold uppercase text-darkGreen">
              Steps
            </h4>
            <div>
              {section.steps.map((step, i) => (
                <StrikeableStep key={i} step={step} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
