import { useFormContext } from "react-hook-form";
import { CreateRecipeFormData } from "./CreateRecipeDialog";
import { TextButton } from "@/shared/form-components/TextButton";
import CloseIcon from "@/assets/close.svg?react";
import { TextInputField } from "@/shared/form-components/TextInputField";
import { translations } from "@/i18n";
import { PlatformSupportedLanguages } from "@/types/models";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  sectionIndex: number;
}

const StepTable = ({ sectionIndex }: Props) => {
  const { watch, setValue } = useFormContext<CreateRecipeFormData>();
  const sections = watch("sections");

  const removeStep = (stepIndex: number) => {
    sections[sectionIndex].steps.splice(stepIndex, 1);
    setValue("sections", sections);
  };

  const addStep = () => {
    sections[sectionIndex].steps = [...sections[sectionIndex].steps, ""];
    setValue("sections", sections);
  };

  const updateStep = (newValue: string, stepIndex: number) => {
    sections[sectionIndex].steps[stepIndex] = newValue;
    setValue("sections", sections);
  };

  const { t, i18n } = useTranslation();
  const createRecipeTranslations = useMemo(
    () =>
      translations[i18n.language as PlatformSupportedLanguages].pages.recipes
        .createRecipe,
    [i18n.language],
  );

  return (
    <>
      <div className="space-y-2">
        {sections[sectionIndex].steps.map((step, stepIndex) => (
          <div key={`step-${stepIndex}`} className="flex items-center gap-2">
            <button
              type="button"
              className="focus-visible:ring-primary-300 flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-neutral-200 transition-colors hover:bg-neutral-300 focus-visible:ring-2 focus-visible:outline-hidden"
              onClick={() => removeStep(stepIndex)}
            >
              <CloseIcon className="h-5 w-5 fill-neutral-600 hover:fill-neutral-800" />
            </button>
            <div className="flex-1">
              <TextInputField
                value={step}
                onChange={(value) => updateStep(value, stepIndex)}
                placeholder={t(createRecipeTranslations.steps.writeStep)}
              />
            </div>
          </div>
        ))}
      </div>
      <TextButton onClicked={addStep}>
        {t(createRecipeTranslations.steps.addNewStep)}
      </TextButton>
    </>
  );
};

export default StepTable;
