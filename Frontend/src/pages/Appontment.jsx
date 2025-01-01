import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets_frontend } from "../assets_frontend/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import RelatedDocs from "../components/RelatedDocs";

const Appontment = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const fetchDocInfo = async () => {
    const info = doctors.find((doc) => doc._id === docId);
    setDocInfo(info);
  };
  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  const getAvailableSlots = async () => {
    setDocSlots([]);

    // getting current date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      //getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      //setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(19, 0, 0, 0);

      //setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString(["en-US"], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // add slots to the array
        timeSlots.push({
          date: new Date(currentDate),
          time: formattedTime,
        });

        // Incrementing time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <div>
        <div className="flex flex-col sm:flex-row  gap-4">
          {/* Doctors image */}
          <div>
            <img
              src={docInfo.img}
              className="bg-indigo-200 w-full sm:max-w-72 rounded-lg"
              alt=""
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white dark:bg-gray-700 mx-2 sm:mx-0">
            {/* Doctors name,degree & experience */}

            <p className="flex items-center gap-1 text-2xl font-medium text-gray-900 dark:text-white">
              {docInfo.name}{" "}
              <img src={assets_frontend.verified_icon} className="w-5" alt="" />
            </p>
            <div className="flex items-center  gap-2 text-sm mt-1 ">
              <p>
                {docInfo.degree} :-{docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-sm rounded-full">
                {docInfo.experience}
              </button>
            </div>
            {/* Doctors About */}
            <div>
              <p className="flex items-center gap-1 text-lg mt-3 font-medium text-gray-900 dark:text-white">
                About
                <FontAwesomeIcon icon={faCircleInfo} className="text-xl" />
              </p>
              <p className="text-sm mt-2">{docInfo.about}</p>
            </div>

            <p className="mt-3">Appontment fees : ${docInfo.fees}</p>
          </div>
        </div>

        {/* Appontment slots */}

        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700 dark:text-white">
          <p>Booking Slots</p>
          <div className="flex gap-3 items-center w-full mt-4 overflow-x-scroll  no-scrollbar">
            {docSlots.length &&
              docSlots.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSlotIndex(index);
                  }}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-200 dark:text-gray-800"
                  }`}
                >
                  <p>{item[0] && days[item[0].date.getDay()]}</p>
                  <p>{item[0] && item[0].date.getDate()}</p>
                </div>
              ))}
          </div>
          
          {/* Time slots */}

          <div className="w-full flex items-center gap-3 mt-4 overflow-x-scroll no-scrollbar">
            {docSlots.length &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  key={index}
                  onClick={() => {
                    setSlotTime(item.time);
                  }}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-200 dark:bg-gray-100 dark:text-gray-800"
                  }`}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button className=" text-white text-sm font-light px-14 py-3 rounded-full my-6 bg-indigo-600 active:scale-[0.97] active:duration-300 active:ease-out ">
            Book an Appontment
          </button>
        </div>

        {/* Listing Related Doctors */}
        <RelatedDocs docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appontment;
