import Logo from "@/assets/logo.svg?react";
import SkilletIcon from "@/assets/skillet.svg?react";
import MenuIcon from "@/assets/menu.svg?react";
import { useMediaQuery } from "@/util/useMediaQuery";
import { useState } from "react";
import CloseIcon from "@/assets/close.svg?react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import {
  EMPTY_MY_FRIDGE_PATH,
  INSPIRATION_PATH,
  ALL_RECIPES_PATH,
  XR_SIZER,
} from "./AppRoutes";
import { AppBarProfileStatus } from "./profile/AppBarProfileStatus";

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
    <nav className="fixed z-20 w-full bg-brown-100 shadow-md">
      <div
        className={`fixed left-0 top-0 z-50 h-full w-full transform bg-brown-200 p-6 transition-all sm:hidden ${isUsingMobileMenu ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          type="button"
          onClick={() => setIsUsingMobileMenu(false)}
          className="
            focus-visible:base-outline 
            absolute
            right-1
            top-1
            m-1
            rounded-full
            transition"
        >
          <CloseIcon className="h-8 w-8 cursor-pointer fill-brown-600 hover:fill-brown-500" />
        </button>
        <div className="flex h-full flex-col gap-2">
          <button
            onClick={() => {
              setIsUsingMobileMenu(false);
              navigate(ALL_RECIPES_PATH);
            }}
            className="focus-visible:base-outline flex w-fit items-center gap-2 rounded-lg p-2 text-xl font-semibold tracking-wider text-brown-600 transition-colors hover:text-brown-500"
          >
            Recipes <SkilletIcon className="size-7" />
          </button>
          <button
            onClick={() => {
              setIsUsingMobileMenu(false);
              navigate(INSPIRATION_PATH);
            }}
            className="focus-visible:base-outline hidden w-fit rounded-lg p-2 text-xl font-semibold tracking-wider text-brown-600 transition-colors hover:text-brown-500"
          >
            Inspiration
          </button>
          <button
            onClick={() => {
              setIsUsingMobileMenu(false);
              navigate(EMPTY_MY_FRIDGE_PATH);
            }}
            className="focus-visible:base-outline hidden w-fit rounded-lg p-2 text-xl font-semibold tracking-wider text-brown-600 transition-colors hover:text-brown-500"
          >
            Empty My Fridge
          </button>

          <div className="mb-0 mt-auto">
            <AppBarProfileStatus
              onNavigateToProfile={() => setIsUsingMobileMenu(false)}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5 px-5 py-3 ">
        {isMinSmallScreen ? (
          <>
            <button
              onClick={() => {
                setIsUsingMobileMenu(false);
                navigate(ALL_RECIPES_PATH);
              }}
              className="focus-visible:base-outline flex items-center gap-1 rounded-lg px-2 font-semibold tracking-wider text-brown-600 transition-colors hover:text-brown-500"
            >
              Recipes <SkilletIcon className="size-6" />
            </button>
            <button
              onClick={() => {
                setIsUsingMobileMenu(false);
                navigate(INSPIRATION_PATH);
              }}
              className="hidden font-semibold tracking-wider text-brown-600 transition-colors hover:text-brown-500"
            >
              Inspiration
            </button>
            <button
              onClick={() => {
                setIsUsingMobileMenu(false);
                navigate(EMPTY_MY_FRIDGE_PATH);
              }}
              className="hidden font-semibold tracking-wider text-brown-600 transition-colors hover:text-brown-500"
            >
              Empty My Fridge
            </button>
            {isMin900WidthScreen && (
              <div className="ml-auto mr-0">
                <AppBarProfileStatus
                  onNavigateToProfile={() => setIsUsingMobileMenu(false)}
                />
              </div>
            )}
          </>
        ) : (
          <button
            type="button"
            onClick={onHamburgerMenuClicked}
            className="focus-visible:base-outline rounded-lg"
          >
            <MenuIcon className="h-8 w-8 fill-brown-600 transition-colors hover:fill-brown-500" />
          </button>
        )}
        {!isMin900WidthScreen && (
          <div className="ml-auto mr-0 flex items-center gap-2">
            {isMinSmallScreen && (
              <AppBarProfileStatus
                onNavigateToProfile={() => setIsUsingMobileMenu(false)}
              />
            )}
            <div className="bg-brown-100 p-1">
              <Logo
                className="h-7 w-auto fill-current text-brown-600"
                onMouseDown={handleTouchStart}
                onMouseUp={handleTouchEnd}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              />
            </div>
          </div>
        )}
      </div>
      {isMin900WidthScreen && (
        <div className="absolute left-0 right-0 top-3 z-10 mx-auto w-56 border-4 border-brown-600 bg-brown-100 p-2 shadow-md">
          <Logo
            className="fill-current text-brown-600"
            onMouseDown={handleTouchStart}
            onMouseUp={handleTouchEnd}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          />
        </div>
      )}
    </nav>
  );
};
