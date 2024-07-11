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
      <div className="flex w-full flex-col items-center rounded-md bg-whiteSmoke p-4 shadow-md sm:w-3/4 lg:w-2/3 xl:w-1/2">
        <h1 className="self-start px-2 pb-4 font-caveat text-5xl font-bold tracking-wider">
          <IconButton
            icon="chevron-left"
            onClick={() => navigate(RECIPES_PATH)}
            size="lg"
          />
          {texts.title}
        </h1>

        {isLoadingSignIn && (
          <p className="text-center text-xl tracking-wide">{texts.loading}</p>
        )}

        {authError && (
          <p className="text-center text-xl tracking-wide">{authError}</p>
        )}

        {!isLoadingSignIn && (
          <>
            {currentUser ? (
              <>
                <p className="pb-4 text-center text-xl tracking-wide">
                  {`${texts.welcome} ${auth.currentUser?.displayName}!`}
                </p>
                <FilledButton onClick={handleSignOut} type="primary">
                  {texts.signOut}
                </FilledButton>
              </>
            ) : (
              <>
                <p className="pb-4 text-center text-xl tracking-wide">
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
  );
};

const texts = {
  title: "Profile",
  loading: "Loading...",
  welcome: "Welcome",
  signOut: "Sign out",
  notLoggedIn: "You are currently not logged in.",
  signInWithGoogle: "Sign in with Google",
};
