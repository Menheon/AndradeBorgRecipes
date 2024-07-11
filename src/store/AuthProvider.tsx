import { auth, createAndRetrieveNewUserDocument } from "@/data/authService";
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

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

export const AuthContextProvider = ({ children }: Props) => {
  const [isInitLoading, setIsInitLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdming] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const handleSignOut = () => {
    try {
      auth.signOut();
    } catch (error) {
      console.error(error);
      setAuthError("Error signing out. Please try again later.");
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (isInitLoading) {
        setIsInitLoading(false);
      }
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleRegisterOrLogIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredentials = await signInWithPopup(auth, provider);

      const userData = await createAndRetrieveNewUserDocument({
        id: userCredentials.user.uid,
        isAdmin: false,
      });
      setIsAdming(userData.isAdmin);
    } catch (error) {
      console.error(error);
      setAuthError("Error signing in. Please try again later.");
    }
  };

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
