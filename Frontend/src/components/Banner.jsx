import React, { useContext } from "react";
import { assets_frontend } from "../assets_frontend/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Banner = () => {
  const navigate = useNavigate();
  const { token, setToken } = useContext(AppContext);
  return (
    <div className="flex rounded-lg px-6 my-6 md:px-10 lg:px-12 bg-indigo-700 text-white shadow-lg dark:bg-gray-800">
      <div className="flex-1 py-8 sm:py-20 md:py-32 lg:pl-5">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight">
          <p className="">Book Appointment</p>
          <p className="mt-2">with the best trusted doctors in your city.</p>
        </div>
        {token ? (
          ""
        ) : (
          <button
            onClick={() => {
              navigate("/login");
              scrollTo(0, 0);
            }}
            className="btn text-base mt-6"
          >
            Create account
          </button>
        )}
      </div>

      {/* Image Section */}

      <div className="hidden sm:block sm:w-1/2 lg:w-96 relative">
        <img
          className="w-full absolute bottom-0 right-0 max-w-md"
          src={assets_frontend.appointment_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default Banner;
