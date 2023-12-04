import Logo from "../assets/logo.svg?react";

export const AppBar = () => {
  return (
    <div className="container flex items-center gap-5 mx-auto py-3 px-5 bg-gray-300">
      <Logo color="#fff" fill="green" />
      <a href="/recipes">Recipes</a>
      <a href="/inspiration">Inspiration</a>
      <a href="/empty-my-fridge">Empty My Fridge</a>
    </div>
  );
};
