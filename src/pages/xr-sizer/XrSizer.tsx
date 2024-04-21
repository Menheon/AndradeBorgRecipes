import { Footer } from "./Footer";

export const XrSizer = () => {
  const exercises = [
    {
      name: "Squats",
      image:
        "https://static.vecteezy.com/system/resources/previews/015/397/716/original/man-doing-squat-with-barbell-exercise-flat-illustration-isolated-on-white-background-vector.jpg",
      minRepetitions: 8,
      maxRepetitions: 12,
      sets: 4,
      weight: 50,
      currentRepetitions: 10,
    },
    {
      name: "Preacher Curls",
      image:
        "https://static.vecteezy.com/system/resources/previews/017/423/220/original/man-doing-one-arm-dumbbell-preacher-curl-side-view-flat-illustration-isolated-on-different-layer-workout-character-vector.jpg",
      minRepetitions: 8,
      maxRepetitions: 12,
      sets: 4,
      weight: 7,
      currentRepetitions: 8,
    },
    {
      name: "French Press",
      image:
        "https://static.vecteezy.com/system/resources/previews/008/259/278/non_2x/man-doing-dumbbell-pullover-exercise-flat-illustration-isolated-on-white-background-free-vector.jpg",
      minRepetitions: 8,
      maxRepetitions: 12,
      sets: 4,
      weight: 5,
      currentRepetitions: 12,
    },
    {
      name: "Dead Lift",
      image:
        "https://static.vecteezy.com/system/resources/previews/008/418/270/original/man-doing-dumbbell-stiff-leg-deadlift-exercise-flat-illustration-isolated-on-white-background-vector.jpg",
      minRepetitions: 8,
      maxRepetitions: 12,
      sets: 4,
      weight: 5,
      currentRepetitions: 12,
    },
    {
      name: "Calf Raises",
      image:
        "https://static.vecteezy.com/system/resources/previews/008/572/903/original/man-doing-standing-dumbbell-calf-raises-exercise-flat-illustration-isolated-on-white-background-workout-character-set-vector.jpg",
      minRepetitions: 8,
      maxRepetitions: 12,
      sets: 4,
      weight: 5,
      currentRepetitions: 12,
    },
  ];

  return (
    <>
      <div className="fixed w-full z-20 -mt-[60px] text-center bg-gradient-to-r from-orange-500 to-orange-600 h-[60px] flex items-center justify-center shadow-md">
        <h1 className="text-4xl font-extrabold text-white select-none">
          XrSizer
        </h1>
      </div>
      <div className="bg-slate-50 w-full h-dvh">
        <div className="pt-2 flex flex-col align-center h-full">
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
                      {exercise.minRepetitions} - {exercise.maxRepetitions} reps
                      of {exercise.sets} sets
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default XrSizer;
