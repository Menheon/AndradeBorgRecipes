import { recipesDB } from "@/firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { User } from "@/types/models";

export const USER_QUERY_KEY = "user";

const UsersCollectionName = "Users";

/**
 * Check if the user is new. If so, create a new user document in the database with the UID.
 * @param user - The user object containing the user information.
 * @returns Promise<void>
 */
export const createNewUserDocument = async (user: User): Promise<void> => {
  const userRef = doc(recipesDB, UsersCollectionName, user.id);
  const userSnapshot = await getDoc(userRef);
  if (userSnapshot.exists()) return;

  // Create a reference to the new user in the FireStore database
  await setDoc(userRef, {
    isAdmin: user.isAdmin,
  });
};

/**
 * Get a user by their ID.
 * @param userId - The ID of the user.
 * @returns Promise<User | null> - The user object if found, otherwise null.
 */
export const getUserById = async (userId: string): Promise<User | null> => {
  const userRef = doc(recipesDB, UsersCollectionName, userId);
  const userSnapshot = await getDoc(userRef);
  if (!userSnapshot.exists()) return null;

  const user: User = {
    id: userSnapshot.id,
    isAdmin: userSnapshot.data().isAdmin,
  };
  console.log(user);

  return user;
};
