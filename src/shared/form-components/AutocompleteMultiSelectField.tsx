import { PlatformSupportedLanguages } from "@/types/models";
import { useEffect, useMemo, useState } from "react";
import { TextInputField } from "./TextInputField";
import { translations } from "@/i18n";
import { useTranslation } from "react-i18next";

type Props<T> = {
  onOptionSelected: (option: T) => void;
  existingOptions: T[];
  addedOptions: T[];
  keyPrefix: string;
  getOptionValue: (option: T) => string;
  getOptionId: (option: T) => string;
  createNewOption: (label: string, id: string) => T;
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
}: Props<T>) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<T[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (value: string) => {
    const trimmedValue = value.trim();
    const capitalizedValue = trimmedValue[0]
      ? trimmedValue[0].toUpperCase() + trimmedValue.substring(1)
      : "";

    setInputValue(capitalizedValue);
    if (capitalizedValue !== "") {
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

  const { t, i18n } = useTranslation();
  const tagTranslations = useMemo(
    () =>
      translations[i18n.language as PlatformSupportedLanguages].pages.recipes
        .createRecipe.tags,
    [i18n.language],
  );

  return (
    <div className="relative">
      <TextInputField
        value={inputValue}
        onChange={handleInputChange}
        placeholder={t(tagTranslations.writeRecipeTags)}
      />
      {showDropdown && (
        <ul
          className="
              fixed
              z-10
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
                {t(tagTranslations.createNewTag)} "{inputValue}"
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteMultiSelectField;
