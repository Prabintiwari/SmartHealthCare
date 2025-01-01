import React from "react";
import { specialityData } from "../assets_frontend/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div
      id="speciality"
      className="flex flex-col items-center gap-4 py-10 m-auto md:py-[10vh]"
    >
      <h1 className="text-3xl font-medium text-slate-800 dark:text-white">
        Find by Speciality
      </h1>
      <p className="w-3/4 sm:w-1/2 text-center text-base">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>

      <div className="w-full flex justify-between md:justify-center gap-6 pt-5 overflow-scroll  no-scrollbar">
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            key={index}
            className="flex flex-col items-center text-sm cursor-pointer flex-shrink-0 hover:-translate-y-3 transition-all duration-300"
            to={`/doctors/${item.speciality}`}
          >
            <img className="w-16 sm:w-20 mb-2" src={item.image} alt="" />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
