import { TextInputField } from "./TextInputField";
import CloseIcon from "@/assets/close.svg?react";
import {
  Ingredient,
  IngredientLine,
  PlatformSupportedLanguages,
} from "@/types/models";
import { SelectField } from "./SelectField";
import { getAllUnits, isValidUnit, mapUnitToStringFormat } from "@/util/util";
import { TextButton } from "./TextButton";
import { CreateRecipeFormData } from "@/pages/all-recipes/components/CreateRecipeDialog";
import { useFormContext } from "react-hook-form";
import { FloatInputField } from "./FloatInputField";
import { useMediaQuery } from "@/util/useMediaQuery";
import { translations } from "@/i18n";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import AutocompleteMultiSelectField from "./AutocompleteMultiSelectField";
import { useQuery } from "@tanstack/react-query";
import {
  getAllIngredients,
  INGREDIENTS_QUERY_TAG,
} from "@/data/recipesService";

interface Props {
  section: number;
}

export const IngredientsTable = ({ section }: Props) => {
  const isScreenMinExtraSmall = useMediaQuery("minXs");
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

    setValue("sections", sections);
  };

  const updateIngredientLine = (
    ingredientLineProp: keyof IngredientLine,
    newValue: string,
    ingredientLineIndex: number,
  ) => {
    const sections = watch("sections");

    switch (ingredientLineProp) {
      case "ingredient": {
        const upperCasedValue =
          newValue.charAt(0).toUpperCase() + newValue.slice(1);
        sections[section].ingredients[ingredientLineIndex].ingredient.name =
          upperCasedValue;
        break;
      }
      case "amount": {
        if (newValue === "") break;
        sections[section].ingredients[ingredientLineIndex].amount =
          parseFloat(newValue);
        break;
      }
      case "unit": {
        if (isValidUnit(newValue)) {
          sections[section].ingredients[ingredientLineIndex].unit = newValue;
        }
        break;
      }
      default:
        break;
    }
    setValue("sections", sections);
  };

  const { data: existingIngredients } = useQuery({
    queryKey: [INGREDIENTS_QUERY_TAG],
    queryFn: getAllIngredients,
    refetchOnWindowFocus: false,
  });
  const sortedIngredients = useMemo(
    () =>
      existingIngredients?.sort((i1, i2) => i1.name.localeCompare(i2.name)) ??
      [],
    [existingIngredients],
  );

  const onNewIngredientAdded = (
    newIngredient: Ingredient,
    ingredientLineIndex: number,
  ) => {
    updateIngredientLine("ingredient", newIngredient.name, ingredientLineIndex);
  };

  const handleIngredientCleared = (ingredientLineIndex: number) => {
    updateIngredientLine("ingredient", "", ingredientLineIndex);
  };

  const { t, i18n } = useTranslation();
  const ingredientsTranslations = useMemo(
    () =>
      translations[i18n.language as PlatformSupportedLanguages].pages.recipes
        .createRecipe.sections.ingredients,
    [i18n.language],
  );

  return (
    <>
      {isScreenMinExtraSmall ? (
        <div className="space-y-2">
          {sections[section].ingredients.map((value, index) => (
            <div key={value.id ?? index} className="flex items-center gap-2">
              <button
                type="button"
                className="focus-visible:ring-primary-300 flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-neutral-200 transition-colors hover:bg-neutral-300 focus-visible:ring-2 focus-visible:outline-hidden"
                onClick={() => removeIngredientLine(index)}
              >
                <CloseIcon className="h-5 w-5 fill-neutral-600 hover:fill-neutral-800" />
              </button>

              <div className="grid flex-1 grid-cols-3 gap-2">
                {/* Ingredient Name */}
                <div className="col-span-1">
                  {value.ingredient.name ? (
                    <div className="flex gap-1">
                      <div className="flex-1">
                        <TextInputField
                          disabled
                          value={value.ingredient.name}
                          onChange={() => undefined}
                          placeholder={""}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.preventDefault();
                          handleIngredientCleared(index);
                        }}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-neutral-300 bg-white transition-colors hover:bg-neutral-100"
                      >
                        <CloseIcon className="h-4 w-4 fill-neutral-500" />
                      </button>
                    </div>
                  ) : (
                    <AutocompleteMultiSelectField
                      key={new Date().getTime()}
                      existingOptions={sortedIngredients}
                      onOptionSelected={(ingredient) =>
                        onNewIngredientAdded(ingredient, index)
                      }
                      addedOptions={[value.ingredient]}
                      getOptionId={(ingredient) => ingredient.id ?? ""}
                      createNewOption={(name, id) => ({ id, name })}
                      getOptionValue={(ingredient) => ingredient.name}
                      keyPrefix="ingredient-option-"
                      createNewOptionLabel={
                        ingredientsTranslations.addNewIngredient
                      }
                      inputOptionLabel={ingredientsTranslations.writeIngredient}
                    />
                  )}
                </div>

                {/* Amount */}
                <div className="col-span-1">
                  <FloatInputField
                    value={value.amount?.toString() ?? ""}
                    onChange={(value) =>
                      updateIngredientLine("amount", value, index)
                    }
                    placeholder={t(ingredientsTranslations.writeAmount)}
                  />
                </div>

                {/* Unit */}
                <div className="col-span-1">
                  <SelectField
                    placeholder={t(ingredientsTranslations.selectUnit)}
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
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {sections[section].ingredients.map((value, index) => (
            <div
              key={value.id ?? index}
              className="relative rounded-xl border border-neutral-200 bg-white p-4 shadow-sm"
            >
              <button
                type="button"
                onClick={() => removeIngredientLine(index)}
                className="focus-visible:ring-primary-300 absolute top-2 right-2 rounded-full p-1 transition-colors hover:bg-neutral-100 focus-visible:ring-2 focus-visible:outline-hidden"
              >
                <CloseIcon className="h-5 w-5 fill-neutral-500 hover:fill-neutral-700" />
              </button>

              <div className="space-y-3">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                    {t(ingredientsTranslations.name)}
                  </label>
                  {value.ingredient.name ? (
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <TextInputField
                          disabled
                          value={value.ingredient.name}
                          onChange={() => undefined}
                          placeholder={""}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.preventDefault();
                          handleIngredientCleared(index);
                        }}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-neutral-300 bg-white transition-colors hover:bg-neutral-100"
                      >
                        <CloseIcon className="h-4 w-4 fill-neutral-500" />
                      </button>
                    </div>
                  ) : (
                    <AutocompleteMultiSelectField
                      key={new Date().getTime()}
                      existingOptions={sortedIngredients}
                      onOptionSelected={(ingredient) =>
                        onNewIngredientAdded(ingredient, index)
                      }
                      addedOptions={[value.ingredient]}
                      getOptionId={(ingredient) => ingredient.id ?? ""}
                      createNewOption={(name, id) => ({ id, name })}
                      getOptionValue={(ingredient) => ingredient.name}
                      keyPrefix="ingredient-option-"
                      createNewOptionLabel={
                        ingredientsTranslations.addNewIngredient
                      }
                      inputOptionLabel={ingredientsTranslations.writeIngredient}
                    />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                      {t(ingredientsTranslations.amount)}
                    </label>
                    <FloatInputField
                      value={value.amount?.toString() ?? ""}
                      onChange={(value) =>
                        updateIngredientLine("amount", value, index)
                      }
                      placeholder={t(ingredientsTranslations.writeAmount)}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                      {t(ingredientsTranslations.unit)}
                    </label>
                    <SelectField
                      placeholder={t(ingredientsTranslations.selectUnit)}
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
              </div>
            </div>
          ))}
        </div>
      )}
      <TextButton onClicked={addIngredientLine}>
        {t(ingredientsTranslations.addNewIngredient)}
      </TextButton>
    </>
  );
};
