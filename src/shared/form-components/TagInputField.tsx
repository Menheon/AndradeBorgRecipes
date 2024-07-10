import { Tag } from "@/types/models";
import { useEffect, useState } from "react";
import { TextInputField } from "./TextInputField";
import { NEW_TAG_ID } from "@/data/recipesService";

interface Props {
  existingTags: Tag[];
  addedTags: Tag[];
  onTagAdd: (tag: Tag) => void;
}

const tagInputOptionIdPrefix = "tag-input-option-";

const TagInputField = ({ existingTags, onTagAdd, addedTags }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredTags, setFilteredTags] = useState<Tag[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (value: string) => {
    const trimmedValue = value.trim();
    const capitalizedValue = trimmedValue[0]
      ? trimmedValue[0].toUpperCase() + trimmedValue.substring(1)
      : "";

    setInputValue(capitalizedValue);
    if (capitalizedValue !== "") {
      // Filter existing tags based on input value
      const filtered = existingTags.filter(
        (tag) =>
          tag.name.toLowerCase().includes(capitalizedValue.toLowerCase()) &&
          !addedTags.some(
            (t) => t.name.toLowerCase() === tag.name.toLowerCase(),
          ),
      );
      setFilteredTags(filtered);
      setShowDropdown(true);
    } else {
      setFilteredTags([]);
      setShowDropdown(false);
    }
  };

  const handleTagSelect = (tag: Tag) => {
    onTagAdd(tag);
    setInputValue("");
    setShowDropdown(false);
  };

  const handleTagAdd = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue === "") return;
    const newTag: Tag = {
      id: NEW_TAG_ID,
      name: trimmedValue,
    };
    onTagAdd(newTag);
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
    if ((event.target as HTMLElement)?.id.includes(tagInputOptionIdPrefix))
      return;
    setShowDropdown(false);
  };

  const isCreateButtonDisabled = () => {
    return filteredTags.some(
      (tag) => tag.name.toLowerCase() === inputValue.toLowerCase(),
    );
  };

  return (
    <div className="relative">
      <TextInputField
        value={inputValue}
        onChange={handleInputChange}
        placeholder={componentTexts.inputPlaceholder}
      />
      {showDropdown && (
        <ul
          className="
            absolute
            z-10
            w-full 
            rounded-md 
            bg-brown-300
            shadow-md
            shadow-black/50"
        >
          {filteredTags.map((tag) => (
            <li
              key={tag.id}
              className="
                overflow-clip
                first:rounded-t-md
                last:rounded-b-md"
            >
              <button
                id={tagInputOptionIdPrefix + tag.name}
                onClick={() => handleTagSelect(tag)}
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
                {tag.name}
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
                id={`${tagInputOptionIdPrefix}create`}
                onClick={handleTagAdd}
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
                {componentTexts.create} "{inputValue}"
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

const componentTexts = {
  inputPlaceholder: "Write the relevant tags for the recipe",
  create: "Create new tag",
};

export default TagInputField;
