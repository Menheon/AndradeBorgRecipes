import Logo from "@/assets/logo.svg?react";
import MenuIcon from "@/assets/menu.svg?react";
import { useMediaQuery } from "@/util/useMediaQuery";
import { useState } from "react";
import CloseIcon from "@/assets/close.svg?react";

export const AppBar = () => {
  const isMin900WidthScreen = useMediaQuery(900);
  const isMinSmallScreen = useMediaQuery("sm");

  const [isUsingMobileMenu, setIsUsingMobileMenu] = useState(false);

  const onHamburgerMenuClicked = () => {
    setIsUsingMobileMenu(true);
  };

  return (
    <div>
      <div
        className={`p-6 sm:hidden fixed z-50 top-0 left-0 w-full h-full bg-brown-200 transition-all transform ${isUsingMobileMenu ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          type="button"
          onClick={() => setIsUsingMobileMenu(false)}
          className="
              absolute
              top-1
              right-1
              m-1
              focus-visible: outline-none
              focus-visible:ring-2 
              focus-visible:ring-brown-600
              transition
              rounded-full"
        >
          <CloseIcon className="h-8 w-8 fill-brown-600 cursor-pointer hover:fill-brown-500" />
        </button>
        <div className="flex flex-col gap-2">
          <a
            onClick={() => setIsUsingMobileMenu(false)}
            href="/recipes"
            className="text-xl text-brown-600 hover:text-brown-500 transition-colors font-semibold tracking-wider"
          >
            Recipes
          </a>
          <a
            onClick={() => setIsUsingMobileMenu(false)}
            href="/inspiration"
            className="text-xl text-brown-600 hover:text-brown-500 transition-colors font-semibold tracking-wider"
          >
            Inspiration
          </a>
          <a
            onClick={() => setIsUsingMobileMenu(false)}
            href="/empty-my-fridge"
            className="text-xl text-brown-600 hover:text-brown-500 transition-colors font-semibold tracking-wider"
          >
            Empty My Fridge
          </a>
        </div>
      </div>

      <div className="w-full flex items-center gap-5 py-3 px-5 sticky top-0">
        {isMinSmallScreen ? (
          <>
            <a
              href="/recipes"
              className="text-brown-600 hover:text-brown-500 transition-colors font-semibold tracking-wider"
            >
              Recipes
            </a>
            <a
              href="/inspiration"
              className="text-brown-600 hover:text-brown-500 transition-colors font-semibold tracking-wider"
            >
              Inspiration
            </a>
            <a
              href="/empty-my-fridge"
              className="text-brown-600 hover:text-brown-500 transition-colors font-semibold tracking-wider"
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
