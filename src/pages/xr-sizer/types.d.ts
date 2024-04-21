export type User = "Kasper" | "Lylian";

export interface Workout {
  id?: string;
  name: string;
  exercises: WorkoutExercise[];
  user: User;
}

export interface WorkoutExercise {
  id?: string;
  exercise: Exercise;
  weight: number;
  reps: number;
  minReps: number;
  maxReps: number;
  sets: number;
}

export interface Exercise {
  id?: string;
  name: string;
  image: string;
}
