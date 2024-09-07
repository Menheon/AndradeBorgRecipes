import { ALL_RECIPES_PATH } from "@/shared/AppRoutes";
import { FilledButton } from "@/shared/FilledButton";
import { IconButton } from "@/shared/form-components/IconButton";
import { useAuth } from "@/store/AuthProvider";
import { useNavigate } from "react-router-dom";
import { getTimeSpecificWelcomeMessage } from "./util";
import { SelectField } from "@/shared/form-components/SelectField";
import { getPlatformSupportedLanguages } from "@/util/util";
import { useEffect, useMemo } from "react";
import { PlatformSupportedLanguages } from "@/types/models";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { updateUserLanguagePreference } from "@/data/authService";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { translations } from "@/i18n";

type LanguagePreferenceFormData = {
  preferredLanguage: PlatformSupportedLanguages;
};

export const ProfilePage = () => {
  const navigate = useNavigate();
  const {
    googleUserData,
    storedUserData,
    handleRegisterOrLogIn,
    handleSignOut,
    refetchUserData,
    isLoadingSignIn,
    authError,
  } = useAuth();
  const { t, i18n } = useTranslation();

  const languages = getPlatformSupportedLanguages();

  const { control, handleSubmit, setValue } =
    useForm<LanguagePreferenceFormData>({
      mode: "all",
      defaultValues: {
        preferredLanguage: storedUserData?.preferredLanguage,
      },
    });

  const postUpdatedLanguagePreferenceMutation = useMutation({
    mutationFn: updateUserLanguagePreference,
    onSuccess: refetchUserData,
  });

  const handleUpdateLanguagePreference: SubmitHandler<
    LanguagePreferenceFormData
  > = ({ preferredLanguage }) => {
    if (!storedUserData) return;
    postUpdatedLanguagePreferenceMutation.mutate({
      preferredLanguage,
      userId: storedUserData?.id,
    });
  };

  useEffect(() => {
    if (!storedUserData?.preferredLanguage) return;
    setValue("preferredLanguage", storedUserData.preferredLanguage);
  }, [setValue, storedUserData?.preferredLanguage]);

  const welcomeMessage = useMemo(
    () =>
      getTimeSpecificWelcomeMessage(googleUserData?.displayName ?? undefined),
    [googleUserData?.displayName],
  );
  const profilePageTranslations = useMemo(
    () =>
      translations[i18n.language as PlatformSupportedLanguages].pages.profile,
    [i18n.language],
  );
  document.title = t(profilePageTranslations.documentTitle);

  return (
    <div className="mx-auto flex flex-col items-center justify-center p-6">
      <div className="bg-cream-100 flex h-full min-h-80 w-full flex-col items-center rounded-md p-4 shadow-md sm:w-3/4 lg:w-2/3 xl:w-1/2">
        <h1 className="w-full self-start px-2 pb-4 text-center font-caveat text-5xl font-bold tracking-wider">
          <div className="absolute">
            <IconButton
              icon="chevron-left"
              onClick={() => navigate(ALL_RECIPES_PATH)}
              size="lg"
            />
          </div>
          {t(profilePageTranslations.myProfile)}
        </h1>

        <div className="flex h-full flex-1 flex-col items-center">
          {isLoadingSignIn && (
            <p className="flex-1 text-center text-xl tracking-wide">
              {t(profilePageTranslations.loadingProfileData)}
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
                    {t(profilePageTranslations.notLoggedIn)}
                  </p>
                )}
                {googleUserData && storedUserData && (
                  <div className="mt-2 w-48 flex-1">
                    <h2 className="text-lg">
                      {t(profilePageTranslations.preferredLanguage.title)}
                    </h2>
                    <Controller
                      control={control}
                      name="preferredLanguage"
                      render={({ field }) => (
                        <SelectField
                          placeholder={t(
                            profilePageTranslations.preferredLanguage.title,
                          )}
                          options={languages}
                          getDisplayValue={({ label }) => label}
                          getValue={({ code }) => code}
                          onValueSelected={(value) => {
                            setValue(
                              "preferredLanguage",
                              value as PlatformSupportedLanguages,
                            );
                            handleSubmit(handleUpdateLanguagePreference)();
                          }}
                          selectedOption={languages.find(
                            ({ code }) => code === field.value,
                          )}
                        />
                      )}
                    />
                  </div>
                )}
              </div>
              <FilledButton
                onClick={googleUserData ? handleSignOut : handleRegisterOrLogIn}
                type="primary"
              >
                {googleUserData
                  ? t(profilePageTranslations.signOut)
                  : t(profilePageTranslations.signInWithGoogle)}
              </FilledButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
