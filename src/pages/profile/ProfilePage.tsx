import { auth } from "@/data/authService";
import { ALL_RECIPES_PATH } from "@/shared/AppRoutes";
import { FilledButton } from "@/shared/FilledButton";
import { IconButton } from "@/shared/form-components/IconButton";
import { useAuth } from "@/store/AuthProvider";
import { useNavigate } from "react-router-dom";
import { getTimeSpecificWelcomeMessage } from "./util";

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
