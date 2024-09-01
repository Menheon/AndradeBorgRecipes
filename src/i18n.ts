import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { PlatformSupportedLanguages } from "./types/models";

type Translations = {
  [key in PlatformSupportedLanguages]: {
    general: {
      actions: {
        create: string;
        update: string;
        delete: string;
        cancel: string;
      };
    };
    navigation: {
      recipes: string;
      inspiration: string;
      emptyMyFridge: string;
      signIn: string;
    };
    pages: {
      recipes: {
        documentTitle: string;
        allRecipes: string;
        loadingRecipes: string;
        loadError: string;
        noMatchingRecipes: string;
        searchPlaceholder: string;
        createRecipe: {
          generalData: {
            createRecipeTitle: string;
            title: string;
            writeRecipeTitle: string;
            imageUrl: string;
            pasteImageUrl: string;
            recipeImage: string;
            uploadFileImage: string;
            noImageChosen: string;
            description: string;
            writeDescription: string;
          };
          tags: {
            tagsTitle: string;
            loadingTags: string;
          };
          steps: {
            addNewStep: string;
            writeStep: string;
          };
          sections: {
            sectionsTitle: string;
            sectionTitle: string;
            stepsTitle: string;
            ingredients: {
              ingredientsTitle: string;
              addNewIngredient: string;
              selectUnit: string;
              writeAmount: string;
              writeIngredient: string;
              name: string;
              amount: string;
              unit: string;
            };
            addNewSection: string;
            writeSectionTitle: string;
          };
        };
      };
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
    general: {
      actions: {
        create: "Opret",
        delete: "Slet",
        update: "Opdater",
        cancel: "Afbryd",
      },
    },
    navigation: {
      recipes: "Opskrifter",
      inspiration: "Inspiration",
      emptyMyFridge: "Tøm Mit Køkken",
      signIn: "Log ind",
    },
    pages: {
      recipes: {
        documentTitle: "Andrade & Borg Opskrifter",
        allRecipes: "Alle opskrifter",
        loadingRecipes: "Indlæser opskrifter...",
        loadError: "Der opstod en fejl under indlæsningen af opskrifterne",
        noMatchingRecipes: "Hovsa! Ingen matchende opskrifter fundet...",
        searchPlaceholder: "Søg efter opskrifter...",
        createRecipe: {
          generalData: {
            title: "Titel",
            createRecipeTitle: "Opret ny opskrift",
            writeRecipeTitle: "Indtast opskriftens navn",
            recipeImage: "Opskriftsbillede",
            description: "Beskrivelse",
            writeDescription: "Indtast beskrivelsen til opskriften",
            pasteImageUrl: "Indsæt en URL til opskriftbilledet",
            imageUrl: "Billede URL",
            noImageChosen: "Intet billede valgt",
            uploadFileImage: "Vælg billede",
          },
          tags: {
            tagsTitle: "Tags",
            loadingTags: "Indlæser tags...",
          },
          steps: {
            addNewStep: "Tilføj nyt trin",
            writeStep: "Indtast trin",
          },
          sections: {
            sectionsTitle: "Sektioner",
            sectionTitle: "Sektionstitel",
            stepsTitle: "Trin",
            ingredients: {
              ingredientsTitle: "Ingredienser",
              addNewIngredient: "Tilføj ny ingrediens",
              selectUnit: "Vælg enhed",
              writeAmount: "Indtast mængde",
              writeIngredient: "Indtast ingrediens",
              name: "Navn",
              amount: "Mængde",
              unit: "Enhed",
            },
            addNewSection: "Tilføj ny sektion",
            writeSectionTitle: "Indtast sektionstitel",
          },
        },
      },
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
    general: {
      actions: {
        create: "Create",
        delete: "Delete",
        update: "Update",
        cancel: "Cancel",
      },
    },
    navigation: {
      recipes: "Recipes",
      inspiration: "Inspiration",
      emptyMyFridge: "Empty My Fridge",
      signIn: "Sign in",
    },
    pages: {
      recipes: {
        documentTitle: "Andrade & Borg Recipes",
        allRecipes: "All recipes",
        loadingRecipes: "Loading recipes...",
        loadError: "Failed to load recipes",
        noMatchingRecipes: "Whoops! No recipes matching your search...",
        searchPlaceholder: "Search for recipes...",
        createRecipe: {
          generalData: {
            title: "Title",
            createRecipeTitle: "Create a new recipe",
            writeRecipeTitle: "Write the name for the recipe",
            recipeImage: "Recipe image",
            description: "Description",
            writeDescription: "Write the description of the recipe",
            pasteImageUrl: "Paste the URL for the image of the dish",
            imageUrl: "Image URL",
            noImageChosen: "No image selected",
            uploadFileImage: "Select image",
          },
          tags: {
            tagsTitle: "Tags",
            loadingTags: "Loading tags...",
          },
          steps: {
            addNewStep: "Add new step",
            writeStep: "Write step",
          },
          sections: {
            sectionsTitle: "Sections",
            sectionTitle: "Section title",
            stepsTitle: "Steps",
            ingredients: {
              ingredientsTitle: "Ingredients",
              addNewIngredient: "Add new ingredient",
              selectUnit: "Select unit",
              writeAmount: "Write amount",
              writeIngredient: "Write ingredient",
              name: "Name",
              amount: "Amount",
              unit: "Unit",
            },
            addNewSection: "Add new section",
            writeSectionTitle: "Write section title",
          },
        },
      },
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
