import { useState } from "react";
import { UserPage } from "./UserPage";
import { User } from "./types";

export const XrSizer = () => {
  const [user, setUser] = useState<User>();
  return (
    <>
      <div className="fixed w-full z-20 -mt-[60px] text-center bg-gradient-to-r from-orange-500 to-orange-600 h-[60px] flex items-center justify-center shadow-md">
        <h1 className="text-4xl text-white select-none font-russo-one drop-shadow-md tracking-wide">
          XrSizer
        </h1>
        <div className="absolute right-1">
          <button
            onClick={() => setUser(undefined)}
            className="text-white hover:text-slate-50 transition-colors font-bold rounded-md px-3 py-1 text-lg drop-shadow-sm"
          >
            Select User
          </button>
        </div>
      </div>
      <div className="bg-slate-50 w-full h-dvh">
        <div className="pt-2 flex flex-col align-center h-full">
          {!user && (
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-1 rounded-lg mx-4 mt-2 drop-shadow-lg">
              <div className="bg-white rounded-md h-full p-4">
                <p className="text-2xl font-bold text-center">Select User</p>
                <div className="flex justify-center gap-10 pt-3">
                  <button
                    onClick={() => setUser("Kasper")}
                    className="drop-shadow-sm bg-white hover:bg-slate-50 transition-colors font-bold  px-4 py-3 rounded-lg ring-2 ring-orange-500 hover:ring-orange-600 text-xl"
                  >
                    Kasper
                  </button>
                  <button
                    onClick={() => setUser("Lylian")}
                    className="drop-shadow-sm bg-white hover:bg-slate-50 transition-colors font-bold  px-4 py-3 rounded-lg ring-2 ring-orange-500 hover:ring-orange-600 text-xl"
                  >
                    Lylian
                  </button>
                </div>
              </div>
            </div>
          )}
          {user && <UserPage user={user} />}
        </div>
      </div>
    </>
  );
};

export default XrSizer;
