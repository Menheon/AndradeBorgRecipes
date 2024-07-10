import { auth, createNewUserDocument } from "@/data/authService";
import { FilledButton } from "@/shared/FilledButton";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useEffect, useState } from "react";

export const ProfilePage = () => {
  const initOnAuthStateChanged = () => {
    auth.onAuthStateChanged((user) => {
      if (isInitLoading) {
        setIsInitLoading(false);
      }
      setIsLoggedIn(user !== null);
    });
  };

  useEffect(() => {
    initOnAuthStateChanged();
  }, []);

  const [isInitLoading, setIsInitLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser !== null);

  const handleSignOut = () => {
    auth.signOut();
  };

  const handleRegisterOrLogIn = async () => {
    const provider = new GoogleAuthProvider();
    const userCredentials = await signInWithPopup(auth, provider);

    createNewUserDocument({
      id: userCredentials.user.uid,
      isAdmin: false,
    });
  };

  return (
    <div className="mx-auto flex flex-col items-center justify-center p-4">
      <div className="flex w-2/3 flex-col items-center rounded-md bg-whiteSmoke p-4 shadow-md">
        <h1 className="px-4 pb-4 text-center font-caveat text-5xl font-bold tracking-wider">
          {texts.title}
        </h1>

        {isInitLoading && (
          <p className="text-center text-xl tracking-wide">{texts.loading}</p>
        )}

        {!isInitLoading && (
          <>
            {isLoggedIn ? (
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
