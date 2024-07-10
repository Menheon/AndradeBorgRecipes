import { useState } from "react";
import { UserPage } from "./UserPage";
import { User } from "./types";

export const XrSizer = () => {
  const [user, setUser] = useState<User>();
  return (
    <>
      <div className="fixed z-20 -mt-[60px] flex h-[60px] w-full items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 text-center shadow-md">
        <h1 className="select-none font-russo-one text-4xl tracking-wide text-white drop-shadow-md">
          XrSizer
        </h1>
        <div className="absolute right-1">
          <button
            onClick={() => setUser(undefined)}
            className="rounded-md px-3 py-1 text-lg font-bold text-white drop-shadow-sm transition-colors hover:text-slate-50"
          >
            Select User
          </button>
        </div>
      </div>
      <div className="h-dvh w-full bg-slate-50">
        <div className="align-center flex h-full flex-col pt-2">
          {!user && (
            <div className="mx-4 mt-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 p-1 drop-shadow-lg">
              <div className="h-full rounded-md bg-white p-4">
                <p className="text-center text-2xl font-bold">Select User</p>
                <div className="flex justify-center gap-10 pt-3">
                  <button
                    onClick={() => setUser("Kasper")}
                    className="rounded-lg bg-white px-4 py-3 text-xl  font-bold ring-2 ring-orange-500 drop-shadow-sm transition-colors hover:bg-slate-50 hover:ring-orange-600"
                  >
                    Kasper
                  </button>
                  <button
                    onClick={() => setUser("Lylian")}
                    className="rounded-lg bg-white px-4 py-3 text-xl  font-bold ring-2 ring-orange-500 drop-shadow-sm transition-colors hover:bg-slate-50 hover:ring-orange-600"
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
