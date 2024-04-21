import { Workout } from "../types";
import { exercises } from "./exercises";

export const workouts: Workout[] = [
  {
    name: "Legs, Back & Biceps",
    user: "Kasper",
    exercises: [
      {
        reps: 8,
        weight: 20,
        exercise: exercises[0],
        minReps: 8,
        maxReps: 12,
        sets: 4,
      },
      {
        reps: 8,
        weight: 20,
        exercise: exercises[3],
        minReps: 8,
        maxReps: 12,
        sets: 4,
      },
      {
        reps: 8,
        weight: 20,
        exercise: exercises[4],
        minReps: 8,
        maxReps: 12,
        sets: 4,
      },
      {
        reps: 8,
        weight: 20,
        exercise: exercises[1],
        minReps: 8,
        maxReps: 12,
        sets: 4,
      },
    ],
  },
  {
    name: "Chest, Triceps & Shoulders",
    user: "Kasper",
    exercises: [
      {
        reps: 8,
        weight: 20,
        exercise: exercises[2],
        minReps: 8,
        maxReps: 12,
        sets: 4,
      },
    ],
  },
];
