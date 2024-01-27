import Logo from "@/assets/logo.svg?react";

export const AppBar = () => {
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
      </div>
      <div className="border-darkSlateGrey bg-lightGrey border-4 p-2 absolute left-0 right-0 mx-auto w-56 top-3 z-10">
        <Logo className="fill-current text-darkSlateGrey" />
      </div>
    </div>
  );
};
