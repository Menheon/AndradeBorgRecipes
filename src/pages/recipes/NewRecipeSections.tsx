import { TextInputField } from "@/shared/form-components/TextInputField";
import { TextButton } from "@/shared/form-components/TextButton";
import CloseIcon from "@/assets/close.svg?react";
import { Section } from "@/types/models";
import { useFormContext } from "react-hook-form";
import { CreateRecipeFormData } from "./CreateRecipeDialog";
import { IngredientsTable } from "@/shared/form-components/IngredientsTable";
import StepTable from "./StepTable";

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

  return (
    <div id="recipe-dialog-sections" className="flex flex-col gap-1">
      {sections.map((section, index) => (
        <div
          key={index}
          className="relative m-1 flex flex-col gap-1 rounded-md bg-gray-200 p-3"
        >
          <button
            type="button"
            onClick={() => removeSection(index)}
            className="
              focus-visible:
              absolute
              right-1
              top-1
              m-1 rounded-full
              outline-none 
              transition
              focus-visible:ring-2
              focus-visible:ring-brown-600"
          >
            <CloseIcon className="h-6 w-6 cursor-pointer fill-brown-600 hover:fill-brown-500" />
          </button>
          <div>
            <h4>Section title</h4>
            <TextInputField
              value={section.title}
              onChange={(title) => updateSection("title", title, index)}
              placeholder="Write section title"
            />
          </div>
          <div>
            <h4>Steps</h4>
            <StepTable sectionIndex={index} />
          </div>
          <div>
            <h4>Ingredients</h4>
            <IngredientsTable section={index} />
          </div>
        </div>
      ))}
      <TextButton onClicked={addSection}>Add new section</TextButton>
    </div>
  );
};
