import { auth, createAndRetrieveNewUserDocument } from "@/data/authService";
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { User as UserModel } from "@/types/models";

type Props = {
  children: React.ReactNode;
};

type UserData = {
  googleUserData: User | null;
  storedUserData: UserModel | null;
};

type AuthContextType = {
  googleUserData: User | null;
  storedUserData: UserModel | null;
  handleSignOut: () => void;
  handleRegisterOrLogIn: () => void;
  isLoadingSignIn: boolean;
  authError: string | null;
};

const AuthContext = createContext<AuthContextType>({
  googleUserData: null,
  storedUserData: null,
  handleSignOut: () => {},
  handleRegisterOrLogIn: () => {},
  isLoadingSignIn: true,
  authError: null,
});

const userSessionDataKey = "user-session-data-";

const clearUserSessionData = (userId: string) => {
  sessionStorage.removeItem(userSessionDataKey + userId);
};

const setUserSessionData = (userData: UserModel) => {
  sessionStorage.setItem(
    userSessionDataKey + userData.id,
    JSON.stringify(userData),
  );
};

const getUserSessionData = (userId: string) => {
  const userDataString = sessionStorage.getItem(userSessionDataKey + userId);
  if (!userDataString) return;
  const userData = JSON.parse(userDataString);

  const user: UserModel = {
    id: userId,
    isAdmin: "isAdmin" in userData ? userData.isAdmin : false,
    email: "email" in userData ? userData.email : "",
    preferredLanguage:
      "preferredLanguage" in userData ? userData.preferredLanguage : "en",
  };
  return user;
};

export const AuthContextProvider = ({ children }: Props) => {
  const [isInitLoading, setIsInitLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<UserData>({
    googleUserData: null,
    storedUserData: null,
  });
  const [authError, setAuthError] = useState<string | null>(null);

  const handleSignOut = async () => {
    try {
      clearUserSessionData(auth.currentUser?.uid ?? "");
      await auth.signOut();
    } catch (error) {
      console.error(error);
      setAuthError("Error signing out. Please try again later.");
    }
  };

  const initializeUser = async (user: User) => {
    const userData = getUserSessionData(user.uid);

    if (!userData) {
      const userDocData = await createAndRetrieveNewUserDocument({
        id: user.uid,
        isAdmin: false,
        email: user.email ?? "",
        preferredLanguage: navigator.language === "da" ? "da" : "en",
      });
      setUserSessionData({
        ...userDocData,
        id: user.uid,
      });
      setCurrentUser(({ googleUserData: googleData }) => ({
        googleUserData: googleData,
        storedUserData: {
          ...userDocData,
        },
      }));
    } else {
      setCurrentUser(({ googleUserData: googleData }) => ({
        googleUserData: googleData,
        storedUserData: {
          ...userData,
        },
      }));
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (isInitLoading) {
        setIsInitLoading(false);
      }
      if (user) {
        await initializeUser(user);
      }
      setCurrentUser(({ storedUserData: storedData }) => ({
        googleUserData: user,
        storedUserData: storedData,
      }));
    });

    return () => {
      unsubscribe();
    };
  }, [isInitLoading]);

  const handleRegisterOrLogIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
      setAuthError("Error signing in. Please try again later.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        googleUserData: currentUser.googleUserData,
        storedUserData: currentUser.storedUserData,
        handleSignOut,
        isLoadingSignIn: isInitLoading,
        handleRegisterOrLogIn,
        authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
