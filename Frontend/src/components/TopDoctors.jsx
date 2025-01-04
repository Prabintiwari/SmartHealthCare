import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  return (
    <div className="flex flex-col items-center gap-4 px-4 md:mx-10 py-16">
      <h1 className="text-3xl font-medium text-slate-800 dark:text-white">
        Top Doctors to Book
      </h1>
      <p className="w-3/4 sm:w-1/3 text-center text-base">
        Simply browse through our extensive list of trusted doctors
      </p>

      {/*  For Small Devices */}

      <div className="w-full px-2 sm:hidden">
        <Slider {...settings}>
          {doctors.slice(0, 8).map((item, index) => (
            <div
              onClick={() =>{navigate(`/appointment/${item._id}`), scrollTo(0, 0);} }
              key={index}
              className="border mb-10 border-indigo-700 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-4 transition-all duration-500"
            >
              <img
                className="w-full h-96 object-cover bg-blue-50"
                src={item.img}
                alt={item.name || "Doctor"}
              />
              <div className="p-4">
                <div className="flex gap-2 items-center text-sm text-green-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <p>Available</p>
                </div>
                <p className="text-gray-900 text-lg font-medium dark:text-white">
                  {item.name}
                </p>
                <p className="text-gray-600 text-sm dark:text-gray-400">
                  {item.speciality}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Grid for Medium Devices and Above */}

     <div className="w-full hidden sm:grid grid-cols-auto gap-4 pt-5 gap-y-6 px-10 ">
        
        {doctors.slice(0,10).map((item, index) => (
          <div
            onClick={() => {navigate(`/appointment/${item._id}`); scrollTo(0, 0);}}
            key={index}
            className="border border-indigo-700 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-4 transition-all duration-500"
          >
            <img className="bg-blue-50" src={item.image} alt="" />
            <div className="p-4">
              <div className="flex gap-2 text-sm text-center text-green-500 items-center">
                <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                <p>Available</p>
              </div>
              <p className="text-gray-900 text-lg font-medium dark:text-white">
                {item.name}
              </p>
              <p className="text-gray-600 text-sm dark:text-white">
                {item.speciality}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {navigate("/doctors"); scrollTo(0, 0);} }
        className="btn btn-outline px-8 py-2 text-lg mt-10 dark:bg-white dark:hover:text-slate-900 dark:hover:bg-gray-200"
      >
        More
      </button>
    </div>
  );
};

export default TopDoctors;
