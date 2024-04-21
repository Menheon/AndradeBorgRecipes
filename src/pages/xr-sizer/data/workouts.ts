import { Workout } from "../types";
import { exercises } from "./exercises";

export const workouts: Workout[] = [
  {
    name: "Legs, Back & Biceps",
    user: "Kasper",
    exercises: [
      {
        currentRepetitions: 8,
        weight: 20,
        exercise: exercises[0],
        minRepetitions: 8,
        maxRepetitions: 12,
        sets: 4,
      },
      {
        currentRepetitions: 8,
        weight: 20,
        exercise: exercises[3],
        minRepetitions: 8,
        maxRepetitions: 12,
        sets: 4,
      },
      {
        currentRepetitions: 8,
        weight: 20,
        exercise: exercises[4],
        minRepetitions: 8,
        maxRepetitions: 12,
        sets: 4,
      },
      {
        currentRepetitions: 8,
        weight: 20,
        exercise: exercises[1],
        minRepetitions: 8,
        maxRepetitions: 12,
        sets: 4,
      },
    ],
  },
  {
    name: "Chest, Triceps & Shoulders",
    user: "Kasper",
    exercises: [
      {
        currentRepetitions: 8,
        weight: 20,
        exercise: exercises[2],
        minRepetitions: 8,
        maxRepetitions: 12,
        sets: 4,
      },
    ],
  },
];
