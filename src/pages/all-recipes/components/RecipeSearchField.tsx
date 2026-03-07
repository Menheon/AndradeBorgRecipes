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
    <div className="focus-within:ring-primary-400 z-10 flex items-center overflow-hidden rounded-full bg-white/95 shadow-lg backdrop-blur-sm transition-all focus-within:ring-2 focus-within:ring-offset-2 dark:bg-neutral-800/95 dark:focus-within:ring-offset-neutral-900">
      <input
        type="search"
        placeholder={t(recipesTranslations.searchPlaceholder)}
        className="search-cancel:cursor-pointer search-cancel:scale-125 search-cancel:brightness-25 search-cancel:contrast-75 search-cancel:hue-rotate-165 search-cancel:filter search-cancel:p-0.5 h-12 w-64 bg-transparent px-5 text-neutral-800 placeholder-neutral-400 outline-none sm:w-80 dark:text-neutral-100 dark:placeholder-neutral-500"
        onChange={(event) => onChange(event.target.value)}
      />
      <div className="bg-primary-500 flex h-12 w-12 items-center justify-center">
        <SearchIcon className="h-6 w-6 fill-white" />
      </div>
    </div>
  );
};
