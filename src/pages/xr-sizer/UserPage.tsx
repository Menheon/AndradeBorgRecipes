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
    <div className="px-4 py-2">
      {selectedWorkout ? (
        <>
          <Exercises workout={selectedWorkout} />
          <Footer />
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold">Hi, {user}!</h1>
          <p className="text-md font-semibold">
            Check out your current workouts below
          </p>
          <Workouts user={user} onWorkoutSelected={setSelectedWorkout} />
        </>
      )}
    </div>
  );
};
