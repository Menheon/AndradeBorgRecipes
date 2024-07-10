import { auth } from "@/data/authService";
import { FilledButton } from "@/shared/FilledButton";
import { useAuth } from "@/store/AuthProvider";

export const ProfilePage = () => {
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
        <h1 className="px-4 pb-4 text-center font-caveat text-5xl font-bold tracking-wider">
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
