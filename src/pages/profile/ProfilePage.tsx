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
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <div className="shadow-card overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          {/* Header */}
          <div className="relative border-b border-neutral-100 bg-neutral-50 px-6 py-6">
            <div className="absolute top-1/2 left-4 -translate-y-1/2">
              <IconButton
                icon="chevron-left"
                onClick={() => navigate(ALL_RECIPES_PATH)}
                size="lg"
              />
            </div>
            <h1 className="font-caveat text-center text-4xl font-bold tracking-wide text-neutral-800">
              {t(profilePageTranslations.myProfile)}
            </h1>
          </div>

          {/* Content */}
          <div className="flex flex-col items-center p-6">
            {isLoadingSignIn && (
              <p className="py-8 text-center text-lg text-neutral-500">
                {t(profilePageTranslations.loadingProfileData)}
              </p>
            )}

            {authError && (
              <p className="text-primary-600 py-8 text-center text-lg">
                {authError}
              </p>
            )}

            {!isLoadingSignIn && (
              <>
                <div className="mb-6 flex flex-col items-center text-center">
                  <p className="text-xl font-medium text-neutral-700">
                    {welcomeMessage}
                  </p>
                  {!googleUserData && (
                    <p className="mt-3 text-base text-neutral-500">
                      {t(profilePageTranslations.notLoggedIn)}
                    </p>
                  )}
                  {googleUserData && storedUserData && (
                    <div className="mt-6 w-full max-w-xs">
                      <h2 className="mb-2 text-sm font-semibold tracking-wider text-neutral-500 uppercase">
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
                  onClick={
                    googleUserData ? handleSignOut : handleRegisterOrLogIn
                  }
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
    </div>
  );
};
