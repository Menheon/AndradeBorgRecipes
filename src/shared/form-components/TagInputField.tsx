import { Tag } from "@/types/models";
import { useEffect, useState } from "react";
import { TextInputField } from "./TextInputField";

interface Props {
  existingTags: Tag[];
  onTagAdd: (tag: Tag) => void;
}

const tagInputOptionIdPrefix = "tag-input-option-";

const TagInputField = ({ existingTags, onTagAdd }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredTags, setFilteredTags] = useState<Tag[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (value) {
      // Filter existing tags based on input value
      const filtered = existingTags.filter((tag) =>
        tag.name.toLowerCase().includes(value.toLowerCase()),
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
      id: "-1",
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
            w-full 
            rounded-md 
            shadow-md 
            shadow-black/50"
        >
          {filteredTags.map((tag) => (
            <li
              key={tag.id}
              className="
                first:rounded-t-md
                overflow-clip"
            >
              <button
                id={tagInputOptionIdPrefix + tag.name}
                onClick={() => handleTagSelect(tag)}
                className="
                  cursor-pointer
                  text-white
                  p-2
                  w-full
                  bg-darkGrey
                  hover:text-darkSlateGrey
                  hover:bg-lightGrey"
              >
                {tag.name}
              </button>
            </li>
          ))}
          <li
            className="
              first:rounded-t-md
              rounded-b-md
              overflow-clip"
          >
            <button
              id={`${tagInputOptionIdPrefix}create`}
              onClick={handleTagAdd}
              className="
                cursor-pointer
                p-2
                w-full
                text-white
                bg-darkGrey
                hover:text-darkSlateGrey
                hover:bg-lightGrey"
            >
              {componentTexts.create}
            </button>
          </li>
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
