import Countdown from "./Countdown";

export const Footer = () => {
  return (
    <>
      <div className="fixed w-full z-20 bottom-0 left-0 bg-gradient-to-r from-orange-500 to-orange-600 pt-1 rounded-t-full">
        <div className="bg-white mx-1 p-4 flex flex-col items-center justify-center rounded-t-full">
          <h1 className="text-xl font-bold mb-2 tracking-wider">Countdown</h1>
          <Countdown />
        </div>
      </div>
    </>
  );
};
