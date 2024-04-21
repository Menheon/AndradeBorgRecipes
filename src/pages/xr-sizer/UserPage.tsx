import { useState } from "react";
import { Workouts } from "./Workouts";
import { User, Workout } from "./types";
import { Exercises } from "./Exercises";
import { Footer } from "./Footer";

interface Props {
  user: User;
}

export const UserPage = ({ user }: Props) => {
  const [selectedWorkout, setSelectedWorkout] = useState<Workout>();
  return (
    <div className="py-2 px-4">
      {selectedWorkout ? (
        <>
          <Exercises workout={selectedWorkout} />
          <Footer />
        </>
      ) : (
        <>
          <h1 className="font-bold text-2xl">Hi, {user}!</h1>
          <p className="font-semibold text-md">
            Check out your current workouts below
          </p>
          <Workouts user={user} onWorkoutSelected={setSelectedWorkout} />
        </>
      )}
    </div>
  );
};
