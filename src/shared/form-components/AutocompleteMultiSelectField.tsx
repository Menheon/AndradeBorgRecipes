import { useState } from "react";
import { TextInputField } from "./TextInputField";
import {
  autoUpdate,
  useFloating,
  useFocus,
  useInteractions,
  offset,
  flip,
  size,
} from "@floating-ui/react";

type Props<T> = {
  onOptionSelected: (option: T) => void;
  existingOptions: T[];
  addedOptions: T[];
  keyPrefix: string;
  getOptionValue: (option: T) => string;
  getOptionId: (option: T) => string;
  createNewOption: (label: string, id: string) => T;
  createNewOptionLabel: string;
  inputOptionLabel: string;
};

const NEW_OPTION_ID = "-1";

export const AutocompleteMultiSelectField = <T,>({
  onOptionSelected,
  existingOptions,
  addedOptions,
  keyPrefix,
  createNewOption,
  getOptionValue,
  getOptionId,
  createNewOptionLabel,
  inputOptionLabel,
}: Props<T>) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<T[]>([]);

  const handleInputChange = (value: string) => {
    const capitalizedValue = value[0]
      ? value[0].toUpperCase() + value.substring(1)
      : "";

    setInputValue(capitalizedValue);
    if (value.trim() !== "") {
      // Filter existing tags based on input value
      const filtered = existingOptions.filter(
        (option) =>
          getOptionValue(option)
            .toLowerCase()
            .includes(capitalizedValue.toLowerCase()) &&
          !addedOptions.some(
            (addedOption) =>
              getOptionValue(addedOption).toLowerCase() ===
              getOptionValue(option).toLowerCase(),
          ),
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions([]);
    }
  };

  const handleOptionSelected = (option: T) => {
    onOptionSelected(option);
    setInputValue("");
  };

  const handleOptionAdded = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue === "") return;
    const newOption = createNewOption(trimmedValue, NEW_OPTION_ID);
    onOptionSelected(newOption);
    setInputValue("");
  };

  const isCreateButtonDisabled = () => {
    return filteredOptions.some(
      (option) =>
        getOptionValue(option).toLowerCase() === inputValue.toLowerCase(),
    );
  };

  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    whileElementsMounted: autoUpdate,
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom-start",
    middleware: [
      offset(5),
      // This prevents the floating element from overflowing along its side axis,
      // by flipping it to the opposite side by default.
      flip({ padding: 10 }),
      size({
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${availableHeight}px`,
            minWidth: `${rects.reference.width}px`,
          });
        },
        padding: 20,
      }),
    ],
  });
  const focus = useFocus(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([focus]);

  return (
    <div className="relative">
      <TextInputField
        ref={refs.setReference}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={inputOptionLabel}
        {...getReferenceProps()}
      />

      {isOpen && inputValue.trim() && (
        <ul
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="
            z-10
            mb-2
            max-h-80 
            overflow-y-auto
            rounded-md
            bg-brown-300
            shadow-md
            shadow-black/50"
        >
          {filteredOptions.map((option) => (
            <li
              key={getOptionId(option)}
              className="
                  overflow-clip
                  first:rounded-t-md
                  last:rounded-b-md"
            >
              <button
                id={keyPrefix + getOptionValue(option)}
                onClick={() => handleOptionSelected(option)}
                className="
                  w-full
                  cursor-pointer
                  rounded-md
                  bg-brown-300
                  p-2
                  text-left
                  text-white
                  hover:bg-brown-100
                  hover:text-brown-600
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:-outline-offset-2
                  focus-visible:outline-brown-100"
              >
                {getOptionValue(option)}
              </button>
            </li>
          ))}

          {!isCreateButtonDisabled() && (
            <li
              className="
                  overflow-clip
                  rounded-b-md
                  first:rounded-t-md"
            >
              <button
                id={`${keyPrefix}create`}
                onClick={handleOptionAdded}
                className="
                    w-full
                    cursor-pointer
                    rounded-md
                    bg-brown-300
                    p-2
                    text-left
                    text-white
                    hover:bg-brown-100
                    hover:text-brown-600
                    focus-visible:outline
                    focus-visible:outline-2
                    focus-visible:-outline-offset-2
                    focus-visible:outline-brown-100"
              >
                {createNewOptionLabel} "<i>{inputValue}</i>"
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteMultiSelectField;
