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
    <div id="recipe-dialog-sections" className="flex flex-col gap-3">
      {sections.map((section, index) => (
        <div
          key={section.id ?? index}
          className="relative rounded-xl border border-neutral-200 bg-neutral-50 p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800"
        >
          <button
            type="button"
            onClick={() => removeSection(index)}
            className="focus-visible:base-outline absolute top-2 right-2 rounded-full p-1 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-700"
          >
            <CloseIcon className="h-5 w-5 fill-neutral-500 transition-colors hover:fill-neutral-700 dark:fill-neutral-400 dark:hover:fill-neutral-200" />
          </button>

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-100">
                {t(createRecipeSectionsTranslations.sectionTitle)}
              </label>
              <TextInputField
                value={section.title}
                onChange={(title) => updateSection("title", title, index)}
                placeholder={t(
                  createRecipeSectionsTranslations.writeSectionTitle,
                )}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-100">
                {t(createRecipeSectionsTranslations.stepsTitle)}
              </label>
              <StepTable sectionIndex={index} />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-100">
                {t(
                  createRecipeSectionsTranslations.ingredients.ingredientsTitle,
                )}
              </label>
              <IngredientsTable section={index} />
            </div>
          </div>
        </div>
      ))}
      <TextButton onClicked={addSection}>
        {t(createRecipeSectionsTranslations.addNewSection)}
      </TextButton>
    </div>
  );
};
