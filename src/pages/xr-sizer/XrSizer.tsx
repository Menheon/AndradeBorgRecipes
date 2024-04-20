import { Footer } from "./Footer";

export const XrSizer = () => {
  const exercises = [
    {
      name: "Squats",
      image: "https://via.placeholder.com/150",
      minRepetitions: 8,
      maxRepetitions: 12,
      sets: 4,
      weight: 10,
      currentRepetitions: 10,
    },
    {
      name: "Preacher Curls",
      image: "https://via.placeholder.com/150",
      minRepetitions: 8,
      maxRepetitions: 12,
      sets: 4,
      weight: 10,
      currentRepetitions: 10,
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
            <div className="flex items-center justify-center  rounded-lg shadow-md p-1 m-4 bg-gradient-to-r from-orange-500 to-orange-600">
              <div className="flex bg-white w-full h-full rounded-md min-h-56 px-2 py-1">
                <h2 className="text-2xl font-bold">{exercise.name}</h2>
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
