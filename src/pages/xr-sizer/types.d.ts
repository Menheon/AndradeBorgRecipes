export type User = "Kasper" | "Lylian";

export interface Workout {
  id?: string;
  name: string;
  exercises: UserExercise[];
  user: User;
}

export interface UserExercise {
  id?: string;
  exercise: Exercise;
  weight: number;
  currentRepetitions: number;
  minRepetitions: number;
  maxRepetitions: number;
  sets: number;
}

export interface Exercise {
  id?: string;
  name: string;
  image: string;
}
