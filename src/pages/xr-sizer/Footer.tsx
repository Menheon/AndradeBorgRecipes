import Countdown from "./Countdown";

export const Footer = () => {
  return (
    <>
      <div className="fixed bottom-0 left-0 z-20 w-full rounded-t-full bg-gradient-to-r from-orange-500 to-orange-600 pt-1">
        <div className="mx-1 flex flex-col items-center justify-center rounded-t-full bg-white p-4">
          <h1 className="mb-2 text-xl font-bold tracking-wider">Countdown</h1>
          <Countdown />
        </div>
      </div>
    </>
  );
};
