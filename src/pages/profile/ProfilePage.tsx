import { auth } from "@/data/authService";
import { RECIPES_PATH } from "@/shared/AppRoutes";
import { FilledButton } from "@/shared/FilledButton";
import { IconButton } from "@/shared/form-components/IconButton";
import { useAuth } from "@/store/AuthProvider";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    handleRegisterOrLogIn,
    handleSignOut,
    isLoadingSignIn,
    authError,
  } = useAuth();

  return (
    <div className="mx-auto flex flex-col items-center justify-center p-6">
      <div className="flex h-80 w-full flex-col items-center rounded-md bg-whiteSmoke p-4 shadow-md sm:w-3/4 lg:w-2/3 xl:w-1/2">
        <h1 className="w-full self-start px-2 pb-4 text-center font-caveat text-5xl font-bold tracking-wider">
          <div className="absolute">
            <IconButton
              icon="chevron-left"
              onClick={() => navigate(RECIPES_PATH)}
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
              {currentUser ? (
                <>
                  <p className="flex-1 pb-4 text-center text-xl tracking-wide">
                    {`${texts.welcome} ${auth.currentUser?.displayName}!`}
                  </p>
                  <FilledButton onClick={handleSignOut} type="primary">
                    {texts.signOut}
                  </FilledButton>
                </>
              ) : (
                <>
                  <p className="flex-1 pb-4 text-center text-xl tracking-wide">
                    {texts.notLoggedIn}
                  </p>
                  <FilledButton onClick={handleRegisterOrLogIn} type="primary">
                    {texts.signInWithGoogle}
                  </FilledButton>
                </>
              )}
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
  welcome: "Welcome",
  signOut: "Sign out",
  notLoggedIn: "You are currently not logged in.",
  signInWithGoogle: "Sign in with Google",
};
