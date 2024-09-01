import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { PlatformSupportedLanguages } from "./types/models";

type Translations = {
  [key in PlatformSupportedLanguages]: {
    pages: {
      profile: {
        myProfile: string;
        signInWithGoogle: string;
        signOut: string;
        loadingProfileData: string;
        notLoggedIn: string;
        documentTitle: string;
        preferredLanguage: {
          title: string;
          da: string;
          en: string;
        };
      };
    };
  };
};

export const translations: Translations = {
  da: {
    pages: {
      profile: {
        myProfile: "Min Profil",
        signInWithGoogle: "Log ind med Google",
        signOut: "Log ud",
        loadingProfileData: "Indlæser dine profiloplysninger...",
        notLoggedIn: "Du er pt. ikke logget ind.",
        documentTitle: "Andrade & Borg Opskrifter - Profil",
        preferredLanguage: {
          title: "Foretrukket sprog",
          da: "Dansk",
          en: "English",
        },
      },
    },
  },
  en: {
    pages: {
      profile: {
        myProfile: "My Profile",
        signInWithGoogle: "Sign in with Google",
        signOut: "Sign out",
        loadingProfileData: "Loading your profile data...",
        notLoggedIn: "You are currently not logged in.",
        documentTitle: "Andrade & Borg Recipes - Profile",
        preferredLanguage: {
          title: "Preferred language",
          da: "Dansk",
          en: "English",
        },
      },
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: translations.en,
      },
      da: {
        translation: translations.da,
      },
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });
