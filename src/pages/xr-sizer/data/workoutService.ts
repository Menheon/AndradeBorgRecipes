/* eslint-disable @typescript-eslint/no-explicit-any */
import { recipesDB } from "@/firebase";
import {
  DocumentReference,
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { User, Workout, WorkoutExercise } from "../types";

export const WORKOUTS_QUERY_TAG = "workouts-";

export const NEW_WORKOUT_ID = "-1";

// const ExercisesCollectionName = "Exercises";
// const WorkoutExercisesCollectionName = "WorkoutExercises";
const WorkoutsCollectionName = "Workouts";

export const getWorkoutsDocumentByUserName = async (user: User) => {
  // get the tag reference from the database
  const { docs: workoutDocs } = await getDocs(
    query(
      collection(recipesDB, WorkoutsCollectionName),
      where("user", "==", user),
    ),
  );

  const workouts: Workout[] = await Promise.all(
    workoutDocs.map(async (workoutSnapshot) => {
      const workoutData = workoutSnapshot.data();
      // Add missing closing parentheses and braces
      const workoutExercise = await Promise.all(
        (workoutData.exercises as DocumentReference[]).map<
          Promise<WorkoutExercise>
        >(async (workoutExerciseRef) => {
          const workoutExerciseDoc = await getDoc(workoutExerciseRef);
          const workoutExerciseData = workoutExerciseDoc.data() as any;

          const exerciseDoc = await getDoc(workoutExerciseData.exercise);
          const exerciseData = exerciseDoc.data() as any;

          return {
            exercise: {
              id: exerciseDoc.id,
              name: exerciseData.name,
              image: exerciseData.image,
            },
            id: workoutExerciseDoc.id,
            maxReps: workoutExerciseData.maxReps,
            minReps: workoutExerciseData.minReps,
            reps: workoutExerciseData.reps,
            sets: workoutExerciseData.sets,
            weight: workoutExerciseData.weight,
          };
        }),
      );
      return {
        exercises: workoutExercise,
        id: workoutSnapshot.id,
        name: workoutData.name,
        user: workoutData.user,
      };
    }),
  );
  return workouts;
};
