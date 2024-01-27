import SearchIcon from "@/assets/search.svg?react";

interface Props {
  onChange: (newValue: string) => void;
}

export const RecipeSearchField = ({ onChange }: Props) => {
  return (
    <div className="mt-[-15px] z-10 flex items-center">
      <input
        type="search"
        placeholder="Search..."
        className="
          w-72
          outline-none
          px-2
          py-1
          bg-lightGrey border-2 
          border-darkSlateGrey 
          placeholder-darkSlateGrey 
          search-cancel:cursor-pointer 
          search-cancel:filter
          search-cancel:hue-rotate-[165deg]
          search-cancel:brightness-[25%]
          search-cancel:contrast-75
          "
        onChange={(event) => onChange(event.target.value)}
      />
      <div className="bg-darkSlateGrey h-9 w-9 flex justify-center items-center">
        <SearchIcon className="fill-whiteSmoke w-7 h-7" />
      </div>
    </div>
  );
};
