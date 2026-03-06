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
    <div className="focus-within:base-outline z-10 -mt-3.75 flex items-center rounded-lg shadow-md">
      <input
        type="search"
        placeholder={t(recipesTranslations.searchPlaceholder)}
        className="border-brown-600 bg-grey-150 placeholder-brown-600 search-cancel:cursor-pointer search-cancel:p-0.5 search-cancel:brightness-25 search-cancel:contrast-75 search-cancel:hue-rotate-165 search-cancel:filter h-9 w-72 rounded-l-lg border-2 px-2 py-1 outline-hidden"
        onChange={(event) => onChange(event.target.value)}
      />
      <div className="bg-brown-600 flex h-9 w-9 items-center justify-center rounded-r-lg">
        <SearchIcon className="fill-grey-150 h-7 w-7" />
      </div>
    </div>
  );
};
