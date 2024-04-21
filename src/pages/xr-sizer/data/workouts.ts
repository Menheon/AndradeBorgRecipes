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
      },
      {
        currentRepetitions: 8,
        weight: 20,
        exercise: exercises[3],
      },
      {
        currentRepetitions: 8,
        weight: 20,
        exercise: exercises[4],
      },
      {
        currentRepetitions: 8,
        weight: 20,
        exercise: exercises[1],
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
      },
    ],
  },
];
