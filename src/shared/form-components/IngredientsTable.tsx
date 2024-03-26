import { TextInputField } from "./TextInputField";
import CloseIcon from "@/assets/close.svg?react";
import { IngredientLine, Unit } from "@/types/models";
import { SelectField } from "./SelectField";
import { getAllUnits, isValidUnit, mapUnitToStringFormat } from "@/util/util";
import { TextButton } from "./TextButton";
import { CreateRecipeFormData } from "@/pages/recipes/CreateRecipeDialog";
import { useFormContext } from "react-hook-form";
import { IntegerInputField } from "./IntegerInputField";

interface Props {
  section: number;
}

export const IngredientsTable = ({ section }: Props) => {
  const methods = useFormContext<CreateRecipeFormData>();
  const { watch, setValue } = methods;
  const sections = watch("sections");

  const removeIngredientLine = (ingredientLineIndex: number) => {
    sections[section].ingredients.splice(ingredientLineIndex, 1);
    setValue("sections", sections);
  };

  const addIngredientLine = () => {
    const emptyIngredientLine: IngredientLine = {
      amount: undefined,
      ingredient: { name: "" },
      unit: undefined,
    };
    sections[section].ingredients = [
      ...sections[section].ingredients,
      emptyIngredientLine,
    ];

    // ! TODO check useFieldArray
    setValue("sections", sections);
  };

  const updateIngredientLine = (
    ingredientLineProp: keyof IngredientLine,
    newValue: string,
    ingredientLineIndex: number,
  ) => {
    const sections = watch("sections");

    switch (ingredientLineProp) {
      case "ingredient":
        sections[section].ingredients[ingredientLineIndex].ingredient.name =
          newValue;
        break;
      case "amount":
        if (newValue === "") break;
        sections[section].ingredients[ingredientLineIndex].amount = parseInt(
          newValue,
          10,
        );
        break;
      case "unit":
        if (isValidUnit(newValue)) {
          sections[section].ingredients[ingredientLineIndex].unit =
            newValue as Unit;
        }
        break;
      default:
        break;
    }
    setValue("sections", sections);
  };

  return (
    <div>
      <table>
        <thead>
          {sections[section].ingredients.length > 0 && (
            <tr>
              <td className="pl-3" />
              <td className="pl-3">{ingredientTableTexts.name}</td>
              <td className="pl-3">{ingredientTableTexts.amount}</td>
              <td className="pl-3">{ingredientTableTexts.unit}</td>
            </tr>
          )}
        </thead>

        <tbody>
          {sections[section].ingredients.map((value, index) => (
            <tr key={index}>
              <td className="p-0 pr-1">
                <div
                  className="bg-darkGrey cursor-pointer rounded-l p-2 h-12 flex items-center  mb-1"
                  onClick={() => removeIngredientLine(index)}
                >
                  <CloseIcon className="h-7 w-7 fill-darkSlateGrey hover:fill-lightSlateGrey" />
                </div>
              </td>

              <td className="p-0">
                <div className="bg-darkGrey h-12 flex items-center px-1.5 mb-1">
                  <TextInputField
                    value={value.ingredient.name}
                    onChange={(value) =>
                      updateIngredientLine("ingredient", value, index)
                    }
                    placeholder={ingredientTableTexts.writeIngredient}
                  />
                </div>
              </td>

              <td className="p-0">
                <div className="bg-darkGrey h-12 flex items-center px-1.5 mb-1">
                  <IntegerInputField
                    value={value.amount?.toString() ?? ""}
                    onChange={(value) =>
                      updateIngredientLine("amount", value, index)
                    }
                    placeholder={ingredientTableTexts.writeAmount}
                  />
                </div>
              </td>

              <td className="p-0">
                <div className="bg-darkGrey rounded-r h-12 flex items-center px-1.5 mb-1">
                  <SelectField
                    placeholder={ingredientTableTexts.selectUnit}
                    options={getAllUnits()}
                    getDisplayValue={mapUnitToStringFormat}
                    getValue={(unit) => unit}
                    onValueSelected={(value) =>
                      updateIngredientLine("unit", value, index)
                    }
                    selectedOption={sections[section].ingredients[index].unit}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TextButton onClicked={addIngredientLine}>
        {ingredientTableTexts.addNewIngredient}
      </TextButton>
    </div>
  );
};

const ingredientTableTexts = {
  addNewIngredient: "Add new ingredient",
  selectUnit: "Select unit",
  writeAmount: "Write amount",
  writeIngredient: "Write ingredient",
  name: "Name",
  amount: "Amount",
  unit: "Unit",
};
