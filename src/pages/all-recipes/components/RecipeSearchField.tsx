import SearchIcon from "@/assets/search.svg?react";

interface Props {
  onChange: (newValue: string) => void;
}

export const RecipeSearchField = ({ onChange }: Props) => {
  return (
    <div className="focus-within:base-outline z-10 mt-[-15px] flex items-center rounded-lg shadow-md">
      <input
        type="search"
        placeholder={texts.searchPlaceholder}
        className="
          h-9
          w-72
          rounded-l-lg
          border-2
          border-brown-600 bg-brown-100 
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
        <SearchIcon className="h-7 w-7 fill-whiteSmoke" />
      </div>
    </div>
  );
};

const texts = {
  searchPlaceholder: "Search for recipes...",
};
