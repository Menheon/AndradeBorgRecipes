import { ALL_RECIPES_PATH } from "@/shared/AppRoutes";
import { FilledButton } from "@/shared/FilledButton";
import { IconButton } from "@/shared/form-components/IconButton";
import { useAuth } from "@/store/AuthProvider";
import { useNavigate } from "react-router-dom";
import { getTimeSpecificWelcomeMessage } from "./util";
import { SelectField } from "@/shared/form-components/SelectField";
import { getPlatformSupportedLanguages } from "@/util/util";
import { useEffect, useMemo, useState } from "react";
import { PlatformSupportedLanguages } from "@/types/models";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const {
    googleUserData,
    storedUserData,
    handleRegisterOrLogIn,
    handleSignOut,
    isLoadingSignIn,
    authError,
  } = useAuth();
  document.title = texts.documentTitle;
  const languages = getPlatformSupportedLanguages();

  const [selectedLanguage, setSelectedLanguage] = useState<
    PlatformSupportedLanguages | undefined
  >(undefined);

  useEffect(() => {
    if (!storedUserData?.preferredLanguage) return;
    setSelectedLanguage(storedUserData.preferredLanguage);
  }, [storedUserData?.preferredLanguage]);

  const welcomeMessage = useMemo(
    () =>
      getTimeSpecificWelcomeMessage(googleUserData?.displayName ?? undefined),
    [googleUserData?.displayName],
  );

  return (
    <div className="mx-auto flex flex-col items-center justify-center p-6">
      <div className="flex h-full min-h-80 w-full flex-col items-center rounded-md bg-whiteSmoke p-4 shadow-md sm:w-3/4 lg:w-2/3 xl:w-1/2">
        <h1 className="w-full self-start px-2 pb-4 text-center font-caveat text-5xl font-bold tracking-wider">
          <div className="absolute">
            <IconButton
              icon="chevron-left"
              onClick={() => navigate(ALL_RECIPES_PATH)}
              size="lg"
            />
          </div>
          {texts.title}
        </h1>

        <div className="flex h-full flex-1 flex-col items-center">
          {isLoadingSignIn && (
            <p className="flex-1 text-center text-xl tracking-wide">
              {texts.loading}
            </p>
          )}

          {authError && (
            <p className="flex-1 text-center text-xl tracking-wide">
              {authError}
            </p>
          )}

          {!isLoadingSignIn && (
            <>
              <div className="flex flex-1 flex-col items-center pb-4 text-center text-xl tracking-wide">
                <p className="text-center text-xl tracking-wide">
                  {welcomeMessage}
                </p>
                {!googleUserData && (
                  <p className="pt-3 text-center text-lg tracking-wide">
                    {texts.notLoggedIn}
                  </p>
                )}
                {storedUserData && (
                  <div className="mt-2 w-48 flex-1">
                    <h2 className="text-lg">{texts.preferredLanguage.title}</h2>
                    <SelectField
                      placeholder={texts.preferredLanguage.title}
                      options={languages}
                      getDisplayValue={({ label }) => label}
                      getValue={({ code }) => code}
                      onValueSelected={(value) =>
                        setSelectedLanguage(value as PlatformSupportedLanguages)
                      }
                      selectedOption={languages.find(
                        ({ code }) => code === selectedLanguage,
                      )}
                    />
                  </div>
                )}
              </div>
              <FilledButton
                onClick={googleUserData ? handleSignOut : handleRegisterOrLogIn}
                type="primary"
              >
                {googleUserData ? texts.signOut : texts.signInWithGoogle}
              </FilledButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const texts = {
  title: "My Profile",
  loading: "Loading your profile data...",
  signOut: "Sign out",
  preferredLanguage: {
    title: "Preferred language",
    da: "Dansk",
    en: "English",
  },
  notLoggedIn: "You are currently not logged in.",
  signInWithGoogle: "Sign in with Google",
  documentTitle: "Andrade & Borg Recipes - Profile",
};
