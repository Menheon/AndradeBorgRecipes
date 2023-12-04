import { Recipe } from "types/models";
import { mapUnitToStringFormat } from "util/util";

interface Props {
  recipe: Recipe;
}

export const RecipeItem = ({ recipe }: Props) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center p-4 text-darkGreen">
        {recipe.title}
      </h2>
      <hr className="mb-4 border-t-2 border-darkGreen" />
      {recipe.sections.map((section) => (
        <div className="grid grid-cols-2 gap-4" key={section.title}>
          <div className="bg-pastelGreen rounded-lg px-5 py-2">
            {recipe.sections.length > 1 && (
              <h3 className="item">{section.title}</h3>
            )}
            <div>
              <h4 className="text-lg font-semibold uppercase text-darkGreen">
                Ingredients
              </h4>
              <ul className="list-disc list-inside">
                {section.ingredients.map((ingredient) => (
                  <li className="list-item" key={ingredient.name}>
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
            <h4 className="text-lg font-semibold uppercase text-darkGreen">
              Steps
            </h4>
            <ul className="list-disc list-inside">
              {section.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};
