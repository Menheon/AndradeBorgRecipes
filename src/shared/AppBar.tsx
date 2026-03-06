import Logo from "@/assets/logo.svg?react";
import SkilletIcon from "@/assets/skillet.svg?react";
import MenuIcon from "@/assets/menu.svg?react";
import { useMediaQuery } from "@/util/useMediaQuery";
import { useMemo, useState } from "react";
import CloseIcon from "@/assets/close.svg?react";
import { Link, useNavigate } from "react-router-dom";
import {
  EMPTY_MY_FRIDGE_PATH,
  INSPIRATION_PATH,
  ALL_RECIPES_PATH,
} from "./AppRoutes";
import { AppBarProfileStatus } from "./profile/AppBarProfileStatus";
import { translations } from "@/i18n";
import { PlatformSupportedLanguages } from "@/types/models";
import { useTranslation } from "react-i18next";

export const AppBar = () => {
  const isMinLargeScreen = useMediaQuery("minLg");
  const isMinSmallScreen = useMediaQuery("minSm");
  const navigate = useNavigate();

  const [isUsingMobileMenu, setIsUsingMobileMenu] = useState(false);

  const onHamburgerMenuClicked = () => {
    setIsUsingMobileMenu(true);
  };

  const { t, i18n } = useTranslation();
  const appBarTranslations = useMemo(
    () => translations[i18n.language as PlatformSupportedLanguages].navigation,
    [i18n.language],
  );

  return (
    <nav className="fixed z-50 w-full border-b border-neutral-200 bg-white/95 shadow-sm backdrop-blur-md">
      {/* Open Mobile menu */}
      <div
        className={`fixed inset-0 flex h-dvh w-full transform flex-col gap-8 bg-white transition-all duration-300 sm:hidden ${isUsingMobileMenu ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-end px-4 py-3">
          <button
            type="button"
            onClick={() => setIsUsingMobileMenu(false)}
            className="rounded-lg p-2 transition hover:bg-neutral-100"
          >
            <CloseIcon className="h-7 w-7 cursor-pointer fill-neutral-700 hover:fill-neutral-900" />
          </button>
        </div>

        <div className="flex h-full flex-col gap-2 px-4 pb-4">
          <button
            onClick={() => {
              setIsUsingMobileMenu(false);
              navigate(ALL_RECIPES_PATH);
            }}
            className="focus-visible:base-outline hover:text-primary-600 flex w-fit items-center gap-2 rounded-lg p-3 text-lg font-semibold tracking-wide text-neutral-700 transition-colors hover:bg-neutral-100"
          >
            <SkilletIcon className="fill-primary-500 size-6" />
            {t(appBarTranslations.recipes)}
          </button>
          <button
            onClick={() => {
              setIsUsingMobileMenu(false);
              navigate(INSPIRATION_PATH);
            }}
            className="focus-visible:base-outline hover:text-primary-600 hidden w-fit rounded-lg p-3 text-lg font-semibold tracking-wide text-neutral-700 transition-colors hover:bg-neutral-100"
          >
            {t(appBarTranslations.inspiration)}
          </button>
          <button
            onClick={() => {
              setIsUsingMobileMenu(false);
              navigate(EMPTY_MY_FRIDGE_PATH);
            }}
            className="focus-visible:base-outline hover:text-primary-600 hidden w-fit rounded-lg p-3 text-lg font-semibold tracking-wide text-neutral-700 transition-colors hover:bg-neutral-100"
          >
            {t(appBarTranslations.emptyMyFridge)}
          </button>

          <div className="mt-auto mb-0 border-t border-neutral-200 pt-4">
            <AppBarProfileStatus
              onNavigateToProfile={() => setIsUsingMobileMenu(false)}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3 sm:px-6 lg:px-8">
        {!isMinLargeScreen && (
          <div className="flex flex-1">
            <Link
              to={ALL_RECIPES_PATH}
              className="rounded-lg p-1 transition-colors hover:bg-neutral-100"
            >
              <Logo className="text-primary-600 h-8 w-auto fill-current" />
            </Link>
          </div>
        )}

        {isMinSmallScreen ? (
          <div className="mr-0 ml-auto">
            <AppBarProfileStatus
              onNavigateToProfile={() => setIsUsingMobileMenu(false)}
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={onHamburgerMenuClicked}
            className="focus-visible:base-outline rounded-lg p-2 transition-colors hover:bg-neutral-100"
          >
            <MenuIcon className="h-7 w-7 fill-neutral-700 transition-colors hover:fill-neutral-900" />
          </button>
        )}
      </div>

      {isMinLargeScreen && (
        <div className="absolute top-2 right-0 left-0 z-10 mx-auto w-48 rounded-xl border border-neutral-200 bg-white p-3 shadow-lg">
          <Link to={ALL_RECIPES_PATH}>
            <Logo className="text-primary-600 hover:text-primary-500 -ml-0.5 w-full fill-current transition-colors" />
          </Link>
        </div>
      )}
    </nav>
  );
};
