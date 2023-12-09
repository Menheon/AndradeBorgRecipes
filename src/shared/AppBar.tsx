import Logo from "../assets/logo.svg?react";

export const AppBar = () => {
  return (
    <div className="w-full flex items-center gap-5 py-3 px-5 bg-polyGreen sticky top-0">
      <Logo />
      <a href="/recipes" className="text-white font-semibold tracking-wider">
        Recipes
      </a>
      <a
        href="/inspiration"
        className="text-white font-semibold tracking-wider"
      >
        Inspiration
      </a>
      <a
        href="/empty-my-fridge"
        className="text-white font-semibold tracking-wider"
      >
        Empty My Fridge
      </a>
    </div>
  );
};
