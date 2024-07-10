import { useQuery } from "@tanstack/react-query";
import {
  WORKOUTS_QUERY_TAG,
  getWorkoutsDocumentByUserName,
} from "./data/workoutService";
import { User, Workout } from "./types";
import DumbbellIcon from "@/assets/dumbbell.svg?react";

interface Props {
  user: User;
  onWorkoutSelected: (workout: Workout) => void;
}

export const Workouts = ({ user, onWorkoutSelected }: Props) => {
  const getWorkouts = async () => getWorkoutsDocumentByUserName(user);
  const {
    data: workouts,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: [WORKOUTS_QUERY_TAG + user],
    queryFn: getWorkouts,
  });

  console.log("workouts", workouts);
  console.log("isLoading", isLoading);

  return (
    <div className="mt-8">
      {isLoading && (
        <div className="flex flex-col items-center justify-center">
          <p className="italic ">Retrieving your workouts...</p>
          <DumbbellIcon className="h-10 w-10 animate-spin fill-orange-600 " />
        </div>
      )}
      {isSuccess &&
        workouts.map((workout) => (
          <div
            key={workout.id}
            onClick={() => onWorkoutSelected(workout)}
            className="mt-4 flex cursor-pointer rounded-lg bg-white p-4 shadow-md hover:bg-orange-50"
          >
            <div className="flex flex-1 flex-col">
              <h2 className="text-lg font-bold">{workout.name}</h2>
              <p className="text-md text-slate-400">
                {workout.exercises.length} Exercise
                {workout.exercises.length === 1 ? "" : "s"}
              </p>
            </div>
            <img
              src={workout.exercises[0].exercise.image}
              alt={workout.exercises[0].exercise.name}
              className="h-32 w-32 rounded-md border-2 border-orange-500 shadow-md"
            />
          </div>
        ))}
    </div>
  );
};
