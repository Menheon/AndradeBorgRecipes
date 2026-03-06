import { Workout } from "./types";

interface Props {
  workout: Workout;
}

export const Exercises = ({ workout }: Props) => {
  return (
    <>
      {workout.exercises.map((userExercise) => (
        <div
          key={userExercise.id}
          className="my-2 flex items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 p-1 shadow-md"
        >
          <div className="bg-white flex h-36 w-full items-center gap-4 rounded-md px-2">
            <img
              src={userExercise.exercise.image}
              alt={userExercise.exercise.name}
              className="h-32 w-32 rounded-md shadow"
            />
            <div className="flex flex-1 flex-col py-1">
              <h2 className="text-2xl font-bold ">
                {userExercise.exercise.name}
              </h2>
              <div className="flex gap-1">
                <p className="text-md text-slate-400 pl-2 font-bold italic">
                  {userExercise.minReps} - {userExercise.maxReps} reps of{" "}
                  {userExercise.sets} sets
                </p>
              </div>
              <div className="flex w-full items-center gap-1 pt-2">
                <p className="w-20 text-xl font-bold">Reps</p>
                <p className="text-2xl font-bold">{userExercise.reps}</p>
              </div>
              <div className="flex gap-1">
                <p className="w-20 text-xl font-bold">Weight</p>
                <p className="text-2xl font-bold">{userExercise.weight}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
