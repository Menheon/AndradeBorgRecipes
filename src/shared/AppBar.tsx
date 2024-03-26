import Logo from "@/assets/logo.svg?react";
import { useMediaQuery } from "@/util/useMediaQuery";

export const AppBar = () => {
  const isMin900WidthScreen = useMediaQuery(900);

  return (
    <div>
      <div className="w-full flex items-center gap-5 py-3 px-5 sticky top-0">
        <a
          href="/recipes"
          className="text-darkSlateGrey font-semibold tracking-wider"
        >
          Recipes
        </a>
        <a
          href="/inspiration"
          className="text-darkSlateGrey font-semibold tracking-wider"
        >
          Inspiration
        </a>
        <a
          href="/empty-my-fridge"
          className="text-darkSlateGrey font-semibold tracking-wider"
        >
          Empty My Fridge
        </a>
        {!isMin900WidthScreen && (
          <div className="bg-lightGrey p-1  mr-0 ml-auto">
            <Logo className="fill-current text-darkSlateGrey h-7 w-auto" />
          </div>
        )}
      </div>
      {isMin900WidthScreen && (
        <div className="border-darkSlateGrey bg-lightGrey border-4 p-2 absolute left-0 right-0 mx-auto w-56 top-3 z-10">
          <Logo className="fill-current text-darkSlateGrey" />
        </div>
      )}
    </div>
  );
};
