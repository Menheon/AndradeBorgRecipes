import { auth } from "@/data/authService";
import { ALL_RECIPES_PATH } from "@/shared/AppRoutes";
import { FilledButton } from "@/shared/FilledButton";
import { IconButton } from "@/shared/form-components/IconButton";
import { useAuth } from "@/store/AuthProvider";
import { useNavigate } from "react-router-dom";

const getTimeSpecificWelcomeMessage = (userName: string | undefined) => {
  const currentHour = new Date().getHours();
  const nameOrEmpty = userName ? `, ${userName.split(" ")[0]}` : "";
  let message = "";

  if (currentHour >= 5 && currentHour < 12) {
    const morningMessages = [
      `Good morning${nameOrEmpty}! Ready to whip up something delicious for breakfast? 🍳`,
      `Morning${nameOrEmpty}! The kitchen is calling, and it's time for a tasty start! ☕`,
      `Top of the morning to you${nameOrEmpty}! Let's make breakfast the best meal of the day! 🥐`,
      `Good morning${nameOrEmpty}! Time to cook up some morning magic! 🥚`,
    ];
    message =
      morningMessages[Math.floor(Math.random() * morningMessages.length)];
  } else if (currentHour >= 12 && currentHour < 17) {
    const afternoonMessages = [
      `Good afternoon${nameOrEmpty}! How about a tasty lunch idea? 🥗`,
      `Hey${nameOrEmpty}! Ready to try a new recipe for lunch today? 🥙`,
      `Good afternoon${nameOrEmpty}! Let's cook something delicious to power through the day! 🌯`,
      `Good afternoon${nameOrEmpty}! Ready to spice up your lunch? 🥪`,
    ];
    message =
      afternoonMessages[Math.floor(Math.random() * afternoonMessages.length)];
  } else if (currentHour >= 17 && currentHour < 21) {
    const eveningMessages = [
      `Good evening${nameOrEmpty}! What's cooking for dinner tonight? 🍲`,
      `Evening${nameOrEmpty}! Ready to try a new dinner recipe? 🍝`,
      `Good evening${nameOrEmpty}! Let's end the day with a delicious meal! 🥘`,
      `Hey ${nameOrEmpty}, it's dinner time! What's on the menu? 🍱`,
    ];
    message =
      eveningMessages[Math.floor(Math.random() * eveningMessages.length)];
  } else {
    const nightMessages = [
      `Good night${nameOrEmpty}! How about a quick snack before bed? 🍪`,
      `Nighty night${nameOrEmpty}! Don't forget to prep something yummy for tomorrow! 🥮`,
      `Good night${nameOrEmpty}! Time for some late-night recipe inspiration!🍗`,
      `Sweet dreams${nameOrEmpty}! Maybe dream up a new recipe for tomorrow! 🍜`,
    ];
    message = nightMessages[Math.floor(Math.random() * nightMessages.length)];
  }

  return message;
};

export const ProfilePage = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    handleRegisterOrLogIn,
    handleSignOut,
    isLoadingSignIn,
    authError,
  } = useAuth();
  document.title = texts.documentTitle;

  return (
    <div className="mx-auto flex flex-col items-center justify-center p-6">
      <div className="flex h-80 w-full flex-col items-center rounded-md bg-whiteSmoke p-4 shadow-md sm:w-3/4 lg:w-2/3 xl:w-1/2">
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

        <div className="flex h-full flex-col items-center">
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
              <div className="flex-1 pb-4 text-center text-xl tracking-wide">
                <p className="text-center text-xl tracking-wide">
                  {getTimeSpecificWelcomeMessage(
                    auth.currentUser?.displayName ?? undefined,
                  )}
                </p>
                {!currentUser && (
                  <p className="pt-3 text-center text-lg tracking-wide">
                    {texts.notLoggedIn}
                  </p>
                )}
              </div>
              <FilledButton
                onClick={currentUser ? handleSignOut : handleRegisterOrLogIn}
                type="primary"
              >
                {currentUser ? texts.signOut : texts.signInWithGoogle}
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
  notLoggedIn: "You are currently not logged in.",
  signInWithGoogle: "Sign in with Google",
  documentTitle: "Andrade & Borg Recipes - Profile",
};
