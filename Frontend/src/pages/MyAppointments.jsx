import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);
  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 dark:text-gray-300 border-b">
        My Appointment
      </p>
      <div>
        {doctors.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b dark:border-b-zinc-500"
          >
            <img src={item.img} className="w-32 bg-indigo-50" alt="" />
            <div className="flex-1 text-sm text-zinc-700 dark:text-gray-300">
              <p className="font-semibold text-neutral-800 dark:text-gray-100">
                {item.name}
              </p>
              <p>{item.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1 dark:text-gray-100">
                Address:
              </p>
              <p className="text-xs ">{item.address.line1}</p>
              <p className="text-xs ">{item.address.line2}</p>
              <p className="text-xs">
                <span className="text-sm text-neutral-700 font-medium dark:text-gray-100">
                  Date & Time:
                </span>{" "}
                19,Dec,2024 | 10:01 PM
              </p>
            </div>
            <div>
              {/*This empty div is for placed the button at right side in mbl view*/}
            </div>

            <div className="flex flex-col gap-2 justify-end">
              <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 rounded border dark:text-gray-300 active:scale-[0.97] active:ease-out hover:bg-indigo-700 hover:text-white transition-all duration-300">
                Pay Online
              </button>
              <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 rounded border dark:text-gray-300 active:scale-[0.97] active:ease-out hover:bg-red-600 hover:text-white transition-all duration-300">
                Cancel appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
