import Logo from "@/assets/logo.svg?react";
import MenuIcon from "@/assets/menu.svg?react";
import { useMediaQuery } from "@/util/useMediaQuery";

export const AppBar = () => {
  const isMin900WidthScreen = useMediaQuery(900);
  const isMinSmallScreen = useMediaQuery("sm");

  const onHamburgerMenuClicked = () => {
    // TODO implement sidebar menu navigation for mobile.
  };

  return (
    <div>
      <div className="w-full flex items-center gap-5 py-3 px-5 sticky top-0">
        {isMinSmallScreen ? (
          <>
            <a
              href="/recipes"
              className="text-brown-600 font-semibold tracking-wider"
            >
              Recipes
            </a>
            <a
              href="/inspiration"
              className="text-brown-600 font-semibold tracking-wider"
            >
              Inspiration
            </a>
            <a
              href="/empty-my-fridge"
              className="text-brown-600 font-semibold tracking-wider"
            >
              Empty My Fridge
            </a>
          </>
        ) : (
          <button type="button" onClick={onHamburgerMenuClicked}>
            <MenuIcon className="fill-brown-600 h-8 w-8 hover:fill-brown-500 transition-colors" />
          </button>
        )}
        {!isMin900WidthScreen && (
          <div className="bg-brown-100 p-1  mr-0 ml-auto">
            <Logo className="fill-current text-brown-600 h-7 w-auto" />
          </div>
        )}
      </div>
      {isMin900WidthScreen && (
        <div className="border-brown-600 bg-brown-100 border-4 p-2 absolute left-0 right-0 mx-auto w-56 top-3 z-10">
          <Logo className="fill-current text-brown-600" />
        </div>
      )}
    </div>
  );
};
