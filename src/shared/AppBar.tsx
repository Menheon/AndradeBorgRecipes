import Logo from "../assets/logo.svg?react";

export const AppBar = () => {
  return (
    <div className="w-screen flex items-center gap-5 py-3 px-5 bg-lime-700">
      <Logo />
      <a href="/recipes" className="text-white font-semibold">
        Recipes
      </a>
      <a href="/inspiration" className="text-white font-semibold">
        Inspiration
      </a>
      <a href="/empty-my-fridge" className="text-white font-semibold">
        Empty My Fridge
      </a>
    </div>
  );
};
