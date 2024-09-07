import SearchIcon from "@/assets/search.svg?react";
import { translations } from "@/i18n";
import { PlatformSupportedLanguages } from "@/types/models";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  onChange: (newValue: string) => void;
}

export const RecipeSearchField = ({ onChange }: Props) => {
  const { t, i18n } = useTranslation();
  const recipesTranslations = useMemo(
    () =>
      translations[i18n.language as PlatformSupportedLanguages].pages.recipes,
    [i18n.language],
  );
  return (
    <div className="z-10 mt-[-15px] flex items-center rounded-lg shadow-md focus-within:base-outline">
      <input
        type="search"
        placeholder={t(recipesTranslations.searchPlaceholder)}
        className="
          bg-grey-150
          h-9
          w-72
          rounded-l-lg
          border-2 border-brown-600 
          px-2 
          py-1 
          placeholder-brown-600
          outline-none 
          search-cancel:cursor-pointer
          search-cancel:brightness-[25%]
          search-cancel:contrast-75
          search-cancel:hue-rotate-[165deg]
          search-cancel:filter
          "
        onChange={(event) => onChange(event.target.value)}
      />
      <div className="flex h-9 w-9 items-center justify-center rounded-r-lg bg-brown-600">
        <SearchIcon className="fill-grey-150 h-7 w-7" />
      </div>
    </div>
  );
};
