import { TextInputField } from "./TextInputField";
import CloseIcon from "@/assets/close.svg?react";
import { IngredientLine, Unit } from "@/types/models";
import { SelectField } from "./SelectField";
import { getAllUnits, isValidUnit, mapUnitToStringFormat } from "@/util/util";
import { TextButton } from "./TextButton";
import { CreateRecipeFormData } from "@/pages/recipes/components/CreateRecipeDialog";
import { useFormContext } from "react-hook-form";
import { IntegerInputField } from "./IntegerInputField";
import { useMediaQuery } from "@/util/useMediaQuery";

interface Props {
  section: number;
}

export const IngredientsTable = ({ section }: Props) => {
  const isScreenMinExtraSmall = useMediaQuery("xs");
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
        const upperCasedValue =
          newValue.charAt(0).toUpperCase() + newValue.slice(1);
        sections[section].ingredients[ingredientLineIndex].ingredient.name =
          upperCasedValue;
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
    <>
      {isScreenMinExtraSmall ? (
        <table
          className="
          w-full"
        >
          <thead>
            {sections[section].ingredients.length > 0 && (
              <tr>
                <td className="w-12 pl-3" />
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
                  <button
                    type="button"
                    className="
                      mb-1 
                      flex 
                      h-12 
                      cursor-pointer 
                      items-center 
                      rounded-l 
                      bg-brown-300 
                      p-2
                      focus-visible:outline-none
                      focus-visible:ring
                      focus-visible:ring-inset
                      focus-visible:ring-brown-100"
                    onClick={() => removeIngredientLine(index)}
                  >
                    <CloseIcon className="h-7 w-7 fill-brown-600 transition-colors hover:fill-brown-500" />
                  </button>
                </td>

                <td className="p-0">
                  <div className="mb-1 flex h-12 items-center bg-brown-300 px-1.5">
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
                  <div className="mb-1 flex h-12 items-center bg-brown-300 px-1.5">
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
                  <div className="mb-1 flex h-12 items-center rounded-r bg-brown-300 px-1.5">
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
      ) : (
        sections[section].ingredients.map((value, index) => (
          <div
            key={index}
            className="
              relative
              mb-2
              mt-1
              flex
              w-full
              flex-col
              gap-1
              rounded-md
              bg-brown-300
              p-2"
          >
            <button
              type="button"
              onClick={() => removeIngredientLine(index)}
              className="
                absolute
                right-1
                top-1
                rounded-full
                transition-colors 
                focus-visible:outline-none 
                focus-visible:ring-2 
                focus-visible:ring-brown-600"
            >
              <CloseIcon className="h-6 w-6 fill-brown-600 hover:fill-brown-500" />
            </button>

            <div>
              <label>{ingredientTableTexts.name}</label>
              <TextInputField
                value={value.ingredient.name}
                onChange={(value) =>
                  updateIngredientLine("ingredient", value, index)
                }
                placeholder={ingredientTableTexts.writeIngredient}
              />
            </div>

            <div>
              <label>{ingredientTableTexts.amount}</label>
              <IntegerInputField
                value={value.amount?.toString() ?? ""}
                onChange={(value) =>
                  updateIngredientLine("amount", value, index)
                }
                placeholder={ingredientTableTexts.writeAmount}
              />
            </div>

            <div>
              <label>{ingredientTableTexts.unit}</label>
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
          </div>
        ))
      )}
      <TextButton onClicked={addIngredientLine}>
        {ingredientTableTexts.addNewIngredient}
      </TextButton>
    </>
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
