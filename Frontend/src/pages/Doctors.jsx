import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();

  const navigate = useNavigate();

  const { doctors } = useContext(AppContext);

  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="min-h-[80vh]">
      <p>Browse through the doctors speciality.</p>
      <div className="flex flex-col sm:flex-row items-start gap-4 px-4 mt-5">
        <button onClick={()=> setShowFilter(!showFilter)} className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter? "bg-indigo-700 text-white" :""}`}>Filters</button>
        <div className={`flex flex-col gap-4 text-sm text-gray-600 dark:text-white ${showFilter? "block" :"hidden"} sm:flex`}>
          <p
            onClick={() => {
              speciality === "General physician"
                ? navigate("/doctors")
                : navigate("/doctors/General physician");
              scrollTo(0, 0);setShowFilter(!showFilter)
            }}
            className={`w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "General physician"
                ? "bg-indigo-200 text-black "
                : ""
            }`}
          >
            General physician
          </p>
          <p
            onClick={() => {
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist");
              scrollTo(0, 0);setShowFilter(!showFilter)
            }}
            className={`w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Gynecologist" ? "bg-indigo-200 text-black " : ""
            }`}
          >
            Gynecologist
          </p>
          <p
            onClick={() => {
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist");
              scrollTo(0, 0);setShowFilter(!showFilter)
            }}
            className={`w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Dermatologist" ? "bg-indigo-200 text-black " : ""
            }`}
          >
            Dermatologist
          </p>
          <p
            onClick={() => {
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians");
              scrollTo(0, 0);setShowFilter(!showFilter)
            }}
            className={`w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Pediatricians" ? "bg-indigo-200 text-black " : ""
            }`}
          >
            Pediatricians
          </p>
          <p
            onClick={() => {
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist");
              scrollTo(0, 0);setShowFilter(!showFilter)
            }}
            className={`w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Neurologist" ? "bg-indigo-200 text-black " : ""
            }`}
          >
            Neurologist
          </p>
          <p
            onClick={() => {
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist");
              scrollTo(0, 0);setShowFilter(!showFilter)
            }}
            className={`w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Gastroenterologist"
                ? "bg-indigo-200 text-black "
                : ""
            }`}
          >
            Gastroenterologist
          </p>
        </div>

        {filterDoc.length > 0 ? (
          <div className="w-full grid grid-cols-auto gap-4 gap-y-6 px-10 ">
            
            {filterDoc.map((item, index) => (
              <div
                onClick={() => {
                  navigate(`/appointment/${item._id}`);
                  scrollTo(0, 0);
                }}
                key={index}
                className="border border-indigo-700 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-4 transition-all duration-500"
              >
                <img className="bg-blue-50" src={item.img} alt="" />
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
        ) : (
          <div className="w-full flex flex-col text-center items-center justify-center text-gray-600 dark:text-white py-10">
            <p className="text-base">No doctors found for </p>
            <p className="font-medium text-xl text-gray-800 dark:text-gray-100">
              {speciality} speciality{" "}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;
