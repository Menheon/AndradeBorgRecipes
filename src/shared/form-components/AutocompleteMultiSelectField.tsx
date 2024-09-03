import { useEffect, useState } from "react";
import { TextInputField } from "./TextInputField";

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
  const [showDropdown, setShowDropdown] = useState(false);

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
      setShowDropdown(true);
    } else {
      setFilteredOptions([]);
      setShowDropdown(false);
    }
  };

  const handleOptionSelected = (option: T) => {
    onOptionSelected(option);
    setInputValue("");
    setShowDropdown(false);
  };

  const handleOptionAdded = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue === "") return;
    const newOption = createNewOption(trimmedValue, NEW_OPTION_ID);
    onOptionSelected(newOption);
    setInputValue("");
    setShowDropdown(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOnClick);
    return () => {
      document.removeEventListener("mousedown", handleOnClick);
    };
  }, []);

  const handleOnClick = (event: MouseEvent) => {
    if ((event.target as HTMLElement)?.id.includes(keyPrefix)) return;
    setShowDropdown(false);
  };

  const isCreateButtonDisabled = () => {
    return filteredOptions.some(
      (option) =>
        getOptionValue(option).toLowerCase() === inputValue.toLowerCase(),
    );
  };
  // TODO - implement some screen positional logic, so I know to place the dropdown above or below.

  return (
    <div className="relative">
      <TextInputField
        value={inputValue}
        onChange={handleInputChange}
        placeholder={inputOptionLabel}
      />
      {showDropdown && (
        <ul
          className="
              absolute
              z-10
              mb-2
              max-h-32
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
