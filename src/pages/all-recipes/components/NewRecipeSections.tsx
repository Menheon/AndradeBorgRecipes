import { TextInputField } from "@/shared/form-components/TextInputField";
import { TextButton } from "@/shared/form-components/TextButton";
import CloseIcon from "@/assets/close.svg?react";
import { PlatformSupportedLanguages, Section } from "@/types/models";
import { useFormContext } from "react-hook-form";
import { CreateRecipeFormData } from "./CreateRecipeDialog";
import { IngredientsTable } from "@/shared/form-components/IngredientsTable";
import StepTable from "./StepTable";
import { translations } from "@/i18n";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export const NewRecipeSections = () => {
  const methods = useFormContext<CreateRecipeFormData>();
  const { watch, setValue } = methods;
  const sections = watch("sections");

  const addSection = () => {
    setValue("sections", [
      ...sections,
      { title: "", ingredients: [], steps: [] },
    ]);
  };

  const removeSection = (sectionIndex: number) => {
    sections.splice(sectionIndex, 1);
    setValue("sections", sections);
  };

  const updateSection = (
    sectionProp: keyof Section,
    value: string,
    index: number,
  ) => {
    switch (sectionProp) {
      case "ingredients":
        // TODO
        sections[index].ingredients = [];
        break;
      case "title":
        sections[index].title = value;
        break;
      case "steps":
        // TODO
        sections[index].steps = [];
        break;
      default:
        break;
    }
    setValue("sections", sections);
  };

  const { t, i18n } = useTranslation();
  const createRecipeSectionsTranslations = useMemo(
    () =>
      translations[i18n.language as PlatformSupportedLanguages].pages.recipes
        .createRecipe.sections,
    [i18n.language],
  );

  return (
    <div id="recipe-dialog-sections" className="flex flex-col gap-1">
      {sections.map((section, index) => (
        <div
          key={section.id ?? index}
          className="relative m-1 flex flex-col gap-1 rounded-md bg-gray-200 p-3"
        >
          <button
            type="button"
            onClick={() => removeSection(index)}
            className="
              absolute 
              right-1
              top-1 
              m-1
              rounded-full
              transition
              focus-visible:base-outline"
          >
            <CloseIcon className="h-6 w-6 cursor-pointer fill-brown-600 hover:fill-brown-500" />
          </button>
          <div>
            <h4>{t(createRecipeSectionsTranslations.sectionTitle)}</h4>
            <TextInputField
              value={section.title}
              onChange={(title) => updateSection("title", title, index)}
              placeholder={t(
                createRecipeSectionsTranslations.writeSectionTitle,
              )}
            />
          </div>
          <div>
            <h4>{t(createRecipeSectionsTranslations.stepsTitle)}</h4>
            <StepTable sectionIndex={index} />
          </div>
          <div>
            <h4>
              {t(createRecipeSectionsTranslations.ingredients.ingredientsTitle)}
            </h4>
            <IngredientsTable section={index} />
          </div>
        </div>
      ))}
      <TextButton onClicked={addSection}>
        {t(createRecipeSectionsTranslations.addNewSection)}
      </TextButton>
    </div>
  );
};
