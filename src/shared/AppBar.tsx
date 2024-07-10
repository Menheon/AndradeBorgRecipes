import Logo from "@/assets/logo.svg?react";
import MenuIcon from "@/assets/menu.svg?react";
import { useMediaQuery } from "@/util/useMediaQuery";
import { useState } from "react";
import CloseIcon from "@/assets/close.svg?react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import {
  EMPTY_MY_FRIDGE_PATH,
  INSPIRATION_PATH,
  RECIPES_PATH,
  XR_SIZER,
} from "./AppRoutes";

export const AppBar = () => {
  const isMin900WidthScreen = useMediaQuery(900);
  const isMinSmallScreen = useMediaQuery("sm");
  const navigate = useNavigate();
  const location = useLocation();

  const [isUsingMobileMenu, setIsUsingMobileMenu] = useState(false);

  const onHamburgerMenuClicked = () => {
    setIsUsingMobileMenu(true);
  };

  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout>();
  const handleTouchStart = () => {
    setPressTimer(setTimeout(() => navigate(XR_SIZER), 3000));
  };

  const handleTouchEnd = () => {
    clearTimeout(pressTimer);
  };

  const isXrSizer = matchPath(location.pathname, XR_SIZER);

  if (isXrSizer) {
    return <div />;
  }

  return (
    <div className="fixed bg-brown-100 z-20 w-full shadow-md">
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
          <button
            onClick={() => {
              setIsUsingMobileMenu(false);
              navigate(RECIPES_PATH);
            }}
            className="text-xl text-brown-600 hover:text-brown-500 transition-colors font-semibold tracking-wider"
          >
            Recipes
          </button>
          <button
            onClick={() => {
              setIsUsingMobileMenu(false);
              navigate(INSPIRATION_PATH);
            }}
            className="text-xl text-brown-600 hover:text-brown-500 transition-colors font-semibold tracking-wider hidden"
          >
            Inspiration
          </button>
          <button
            onClick={() => {
              setIsUsingMobileMenu(false);
              navigate(EMPTY_MY_FRIDGE_PATH);
            }}
            className="text-xl text-brown-600 hover:text-brown-500 transition-colors font-semibold tracking-wider hidden"
          >
            Empty My Fridge
          </button>
        </div>
      </div>

      <div className="flex items-center gap-5 py-3 px-5 ">
        {isMinSmallScreen ? (
          <>
            <button
              onClick={() => {
                setIsUsingMobileMenu(false);
                navigate(RECIPES_PATH);
              }}
              className="text-brown-600 hover:text-brown-500 transition-colors font-semibold tracking-wider"
            >
              Recipes
            </button>
            <button
              onClick={() => {
                setIsUsingMobileMenu(false);
                navigate(INSPIRATION_PATH);
              }}
              className="text-brown-600 hover:text-brown-500 transition-colors font-semibold tracking-wider hidden"
            >
              Inspiration
            </button>
            <button
              onClick={() => {
                setIsUsingMobileMenu(false);
                navigate(EMPTY_MY_FRIDGE_PATH);
              }}
              className="text-brown-600 hover:text-brown-500 transition-colors font-semibold tracking-wider hidden"
            >
              Empty My Fridge
            </button>
          </>
        ) : (
          <button type="button" onClick={onHamburgerMenuClicked}>
            <MenuIcon className="fill-brown-600 h-8 w-8 hover:fill-brown-500 transition-colors" />
          </button>
        )}
        {!isMin900WidthScreen && (
          <div className="bg-brown-100 p-1  mr-0 ml-auto">
            <Logo
              className="fill-current text-brown-600 h-7 w-auto"
              onMouseDown={handleTouchStart}
              onMouseUp={handleTouchEnd}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            />
          </div>
        )}
      </div>
      {isMin900WidthScreen && (
        <div className="border-brown-600 bg-brown-100 border-4 p-2 absolute left-0 right-0 mx-auto w-56 top-3 z-10">
          <Logo
            className="fill-current text-brown-600"
            onMouseDown={handleTouchStart}
            onMouseUp={handleTouchEnd}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          />
        </div>
      )}
    </div>
  );
};
