import { exercises } from "./data/exercises";

export const Exercises = () => {
  return (
    <>
      {exercises.map((exercise) => (
        <div className="flex items-center justify-center  rounded-lg shadow-md p-1 mx-4 my-2 bg-gradient-to-r from-orange-500 to-orange-600">
          <div className="flex bg-white w-full rounded-md h-36 items-center">
            <img
              src={exercise.image}
              alt={exercise.name}
              className="rounded-md h-32 w-32"
            />
            <div className="flex flex-col flex-1 py-1">
              <h2 className="text-2xl font-bold ">{exercise.name}</h2>
              <div className="flex gap-1">
                <p className="text-md font-bold italic pl-2">
                  {exercise.minRepetitions} - {exercise.maxRepetitions} reps of{" "}
                  {exercise.sets} sets
                </p>
              </div>
              <div className="flex gap-1 items-center w-full pt-2">
                <p className="text-xl font-bold w-20">Reps</p>
                <p className="text-2xl font-bold">
                  {exercise.currentRepetitions}
                </p>
              </div>
              <div className="flex gap-1">
                <p className="text-xl font-bold w-20">Weight</p>
                <p className="text-2xl font-bold">{exercise.weight}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
