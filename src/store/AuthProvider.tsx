import { auth, createAndRetrieveNewUserDocument } from "@/data/authService";
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { User as UserModel } from "@/types/models";

type Props = {
  children: React.ReactNode;
};

type AuthContextType = {
  currentUser: User | null;
  handleSignOut: () => void;
  handleRegisterOrLogIn: () => void;
  isLoadingSignIn: boolean;
  authError: string | null;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  handleSignOut: () => {},
  handleRegisterOrLogIn: () => {},
  isLoadingSignIn: true,
  authError: null,
  isAdmin: false,
});

const clearUserSessionData = (userId: string) => {
  sessionStorage.removeItem(`user-session-data-${userId}`);
};

const setUserSessionData = (userData: UserModel) => {
  sessionStorage.setItem(
    `user-session-data-${userData.id}`,
    JSON.stringify(userData),
  );
};

const getUserSessionData = (userId: string) => {
  const userDataString = sessionStorage.getItem(`user-session-data-${userId}`);
  if (!userDataString) return;
  const userData = JSON.parse(userDataString);
  console.log("userData storage", userData);

  const user: UserModel = {
    id: userId,
    isAdmin: "isAdmin" in userData ? userData.isAdmin : false,
  };
  return user;
};

export const AuthContextProvider = ({ children }: Props) => {
  const [isInitLoading, setIsInitLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
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
    console.log("userData", userData);

    let isAdmin = userData ? userData.isAdmin : false;
    if (!userData) {
      const userDocData = await createAndRetrieveNewUserDocument({
        id: user.uid,
        isAdmin: false,
      });
      isAdmin = userDocData.isAdmin;
      setUserSessionData({
        id: user.uid,
        isAdmin,
      });
    }
    setIsAdmin(isAdmin);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (isInitLoading) {
        setIsInitLoading(false);
      }
      if (user) {
        await initializeUser(user);
      }
      setCurrentUser(user);
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

  console.log("isAdmin", isAdmin);

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        currentUser,
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
