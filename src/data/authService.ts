import { recipesDB } from "@/firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { PlatformSupportedLanguages, User } from "@/types/models";
import { getAuth } from "firebase/auth";

export const USER_QUERY_KEY = "user";

const UsersCollectionName = "Users";

export const auth = getAuth();

/**
 * Check if the user is new. If so, create a new user document in the database with the UID.
 * @param user - The user object containing the user information.
 * @returns Promise<void>
 */
export const createAndRetrieveNewUserDocument = async (user: User) => {
  const userRef = doc(recipesDB, UsersCollectionName, user.id);
  const userSnapshot = await getDoc(userRef);

  if (userSnapshot.exists()) {
    const { isAdmin, email, preferredLanguage } = userSnapshot.data();
    const retrievedUser: User = {
      id: userSnapshot.id,
      isAdmin,
      email,
      preferredLanguage,
    };
    return retrievedUser;
  }

  // Create a reference to the new user in the FireStore database
  await setDoc(userRef, {
    ...user,
  });
  return user;
};

/**
 * Get a user by their ID.
 * @param userId - The ID of the user.
 * @returns Promise<User | null> - The user object if found, otherwise null.
 */
export const getUserById = async (userId: string) => {
  const userRef = doc(recipesDB, UsersCollectionName, userId);
  const userSnapshot = await getDoc(userRef);
  if (!userSnapshot.exists()) return null;

  const { isAdmin, email, preferredLanguage } = userSnapshot.data();
  const user: User = {
    id: userSnapshot.id,
    isAdmin,
    email,
    preferredLanguage,
  };

  return user;
};

type PostUserLanguagePreference = {
  userId: string;
  preferredLanguage: PlatformSupportedLanguages;
};

export const updateUserLanguagePreference = async ({
  userId,
  preferredLanguage,
}: PostUserLanguagePreference) => {
  const userRef = doc(recipesDB, UsersCollectionName, userId);
  const userSnapshot = await getDoc(userRef);
  if (!userSnapshot.exists()) return;

  const { isAdmin, email } = userSnapshot.data();
  const retrievedUser: User = {
    id: userSnapshot.id,
    isAdmin,
    email,
    preferredLanguage,
  };

  await setDoc(userRef, {
    ...retrievedUser,
  });
};
