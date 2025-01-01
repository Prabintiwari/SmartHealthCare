import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDocs = ({ docId, speciality }) => {
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDoc(doctorsData);
    }
  }, [doctors, docId, speciality]);
  return (
    <div>
      <div className="flex flex-col items-center gap-2 px-4 md:mx-10 py-2 sm:py-16">
        <p className="w-full text-center text-xl pt-10">Related Doctors</p>
        <p className="w-full text-center text-base">
          Simply browse through our extensive list of trusted doctors
        </p>
      </div>

      <div className="w-full grid grid-cols-auto gap-4 pt-10 gap-y-6 px-10 ">
        {relDoc.slice(0, 5).map((item, index) => (
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
    </div>
  );
};

export default RelatedDocs;
