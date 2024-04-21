import { Exercises } from "./Exercises";
import { Footer } from "./Footer";

export const XrSizer = () => {
  return (
    <>
      <div className="fixed w-full z-20 -mt-[60px] text-center bg-gradient-to-r from-orange-500 to-orange-600 h-[60px] flex items-center justify-center shadow-md">
        <h1 className="text-4xl font-extrabold text-white select-none">
          XrSizer
        </h1>
      </div>
      <div className="bg-slate-50 w-full h-dvh">
        <div className="pt-2 flex flex-col align-center h-full">
          <Exercises />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default XrSizer;
