import { useQuery } from "@tanstack/react-query";
import {
  WORKOUTS_QUERY_TAG,
  getWorkoutsDocumentByUserName,
} from "./data/workoutService";
import { User, Workout } from "./types";

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
      {isSuccess &&
        workouts.map((workout) => (
          <div
            key={workout.id}
            onClick={() => onWorkoutSelected(workout)}
            className="bg-white hover:bg-orange-50 p-4 shadow-md flex rounded-lg cursor-pointer mt-4"
          >
            <div className="flex flex-col flex-1">
              <h2 className="text-lg font-bold">{workout.name}</h2>
              <p className="text-md text-slate-400">
                {workout.exercises.length} Exercise
                {workout.exercises.length === 1 ? "" : "s"}
              </p>
            </div>
            <img
              src={workout.exercises[0].exercise.image}
              alt={workout.exercises[0].exercise.name}
              className="h-32 w-32 rounded-md shadow-md border-orange-500 border-2"
            />
          </div>
        ))}
    </div>
  );
};
