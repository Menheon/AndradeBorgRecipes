import Logo from "@/assets/logo.svg?react";
import SkilletIcon from "@/assets/skillet.svg?react";
import MenuIcon from "@/assets/menu.svg?react";
import { useMediaQuery } from "@/util/useMediaQuery";
import { useMemo, useState } from "react";
import CloseIcon from "@/assets/close.svg?react";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import {
  EMPTY_MY_FRIDGE_PATH,
  INSPIRATION_PATH,
  ALL_RECIPES_PATH,
  XR_SIZER,
} from "./AppRoutes";
import { AppBarProfileStatus } from "./profile/AppBarProfileStatus";
import { translations } from "@/i18n";
import { PlatformSupportedLanguages } from "@/types/models";
import { useTranslation } from "react-i18next";

export const AppBar = () => {
  const isMinLargeScreen = useMediaQuery("minLg");
  const isMinSmallScreen = useMediaQuery("minSm");
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

  const { t, i18n } = useTranslation();
  const appBarTranslations = useMemo(
    () => translations[i18n.language as PlatformSupportedLanguages].navigation,
    [i18n.language],
  );

  const isXrSizer = matchPath(location.pathname, XR_SIZER);

  if (isXrSizer) {
    return <div />;
  }

  return (
    <nav className="bg-brown-100 fixed z-20 w-full shadow-md">
      <div
        className={`bg-brown-200 fixed top-0 left-0 z-50 h-full w-full transform p-6 transition-all sm:hidden ${isUsingMobileMenu ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          type="button"
          onClick={() => setIsUsingMobileMenu(false)}
          className="focus-visible:base-outline absolute top-1 right-1 m-1 rounded-full transition"
        >
          <CloseIcon className="fill-brown-600 hover:fill-brown-500 h-8 w-8 cursor-pointer" />
        </button>
        <div className="flex h-full flex-col gap-2">
          <button
            onClick={() => {
              setIsUsingMobileMenu(false);
              navigate(ALL_RECIPES_PATH);
            }}
            className="text-brown-600 focus-visible:base-outline hover:text-brown-500 flex w-fit items-center gap-2 rounded-lg p-2 text-xl font-semibold tracking-wider transition-colors hover:scale-[102.5%]"
          >
            {t(appBarTranslations.recipes)} <SkilletIcon className="size-7" />
          </button>
          <button
            onClick={() => {
              setIsUsingMobileMenu(false);
              navigate(INSPIRATION_PATH);
            }}
            className="text-brown-600 focus-visible:base-outline hover:text-brown-500 hidden w-fit rounded-lg p-2 text-xl font-semibold tracking-wider transition-colors"
          >
            {t(appBarTranslations.inspiration)}
          </button>
          <button
            onClick={() => {
              setIsUsingMobileMenu(false);
              navigate(EMPTY_MY_FRIDGE_PATH);
            }}
            className="text-brown-600 focus-visible:base-outline hover:text-brown-500 hidden w-fit rounded-lg p-2 text-xl font-semibold tracking-wider transition-colors"
          >
            {t(appBarTranslations.emptyMyFridge)}
          </button>

          <div className="mt-auto mb-0">
            <AppBarProfileStatus
              onNavigateToProfile={() => setIsUsingMobileMenu(false)}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5 px-5 py-3">
        {isMinSmallScreen ? (
          <>
            <button
              onClick={() => {
                setIsUsingMobileMenu(false);
                navigate(ALL_RECIPES_PATH);
              }}
              className="text-brown-600 focus-visible:base-outline hover:text-brown-500 flex items-center gap-1 rounded-lg px-2 text-lg font-bold tracking-wider transition-all hover:scale-[102.5%]"
            >
              {t(appBarTranslations.recipes)} <SkilletIcon className="size-7" />
            </button>
            <button
              onClick={() => {
                setIsUsingMobileMenu(false);
                navigate(INSPIRATION_PATH);
              }}
              className="text-brown-600 hover:text-brown-500 hidden font-semibold tracking-wider transition-colors"
            >
              {t(appBarTranslations.inspiration)}
            </button>
            <button
              onClick={() => {
                setIsUsingMobileMenu(false);
                navigate(EMPTY_MY_FRIDGE_PATH);
              }}
              className="text-brown-600 hover:text-brown-500 hidden font-semibold tracking-wider transition-colors"
            >
              {t(appBarTranslations.emptyMyFridge)}
            </button>
            {isMinLargeScreen && (
              <div className="mr-0 ml-auto">
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
            <MenuIcon className="fill-brown-600 hover:fill-brown-500 h-8 w-8 transition-colors" />
          </button>
        )}
        {!isMinLargeScreen && (
          <div className="mr-0 ml-auto flex items-center gap-2">
            {isMinSmallScreen && (
              <AppBarProfileStatus
                onNavigateToProfile={() => setIsUsingMobileMenu(false)}
              />
            )}
            <div className="bg-brown-100 p-1">
              <Logo
                className="text-brown-600 h-7 w-auto fill-current"
                onMouseDown={handleTouchStart}
                onMouseUp={handleTouchEnd}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              />
            </div>
          </div>
        )}
      </div>
      {isMinLargeScreen && (
        <div className="border-brown-600 bg-brown-100 absolute top-3 right-0 left-0 z-10 mx-auto w-56 border-4 p-2 shadow-md">
          <Link to={ALL_RECIPES_PATH}>
            <Logo
              className="text-brown-600 -ml-1 w-full fill-current"
              onMouseDown={handleTouchStart}
              onMouseUp={handleTouchEnd}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            />
          </Link>
        </div>
      )}
    </nav>
  );
};
