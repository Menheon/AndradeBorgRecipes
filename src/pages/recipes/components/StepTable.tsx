import { useFormContext } from "react-hook-form";
import { CreateRecipeFormData } from "./CreateRecipeDialog";
import { TextButton } from "@/shared/form-components/TextButton";
import CloseIcon from "@/assets/close.svg?react";
import { TextInputField } from "@/shared/form-components/TextInputField";

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

  return (
    <>
      <table
        className="
          w-full"
      >
        <thead>
          {sections[sectionIndex].steps.length > 0 && (
            <tr>
              <td className="w-12 pl-3" />
              <td className="pl-3" />
            </tr>
          )}
        </thead>

        <tbody>
          {sections[sectionIndex].steps.map((step, stepIndex) => (
            <tr key={stepIndex}>
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
                      transition-colors
                      focus-visible:outline-none
                      focus-visible:ring
                      focus-visible:ring-inset
                      focus-visible:ring-brown-100"
                  onClick={() => removeStep(stepIndex)}
                >
                  <CloseIcon className="h-7 w-7 fill-brown-600 hover:fill-brown-500" />
                </button>
              </td>
              <td className="p-0">
                <div className="mb-1 flex h-12 items-center rounded-r bg-brown-300 px-1.5">
                  <TextInputField
                    value={step}
                    onChange={(value) => updateStep(value, stepIndex)}
                    placeholder={stepTableTexts.writeStep}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TextButton onClicked={addStep}>{stepTableTexts.addNewStep}</TextButton>
    </>
  );
};

const stepTableTexts = {
  addNewStep: "Add new step",
  writeStep: "Write step",
  name: "Step",
};

export default StepTable;
