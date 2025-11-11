import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "may",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const slotDateFormate = (slotDate) => {
    const dateArray = slotDate.split("_"); //it makes like:- const dateArray = ["12", "05", "2024"];
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        {
          appointmentId,
        },
        {
          headers: { token },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const makePayment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-esewa",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        // For eSewa integration demo - in production, this would redirect to eSewa
        toast.info("eSewa payment gateway integration - Demo mode");
        
        // Simulating payment success for demo
        const verifyData = await axios.post(
          backendUrl + "/api/user/verify-esewa",
          { appointmentId, oid: appointmentId, amt: data.paymentData.amount, refId: "demo_ref_123" }
        );

        if (verifyData.data.success) {
          toast.success("Payment successful!");
          getUserAppointments();
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 dark:text-gray-300 border-b">
        My Appointment
      </p>
      <div>
        {appointments.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b dark:border-b-zinc-500"
          >
            <img
              src={item.docData.image}
              className="w-32 bg-indigo-50 rounded-lg"
              alt=""
            />
            <div className="flex-1 text-sm text-zinc-700 dark:text-gray-300">
              <p className="font-semibold text-neutral-800 dark:text-gray-100">
                {item.docData.name}
              </p>
              <p>{item.docData.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1 dark:text-gray-100">
                Address:
              </p>
              <p className="text-xs ">{item.docData.address.line1}</p>
              <p className="text-xs ">{item.docData.address.line2}</p>
              <p className="text-xs mt-2">
                <span className="text-sm text-neutral-700 font-medium dark:text-gray-100">
                  Date & Time:
                </span>{" "}
                {slotDateFormate(item.slotDate)} | {item.slotTime}
              </p>
              <p className="text-xs mt-2">
                <span className="text-sm text-neutral-700 font-medium dark:text-gray-100">
                  Fees:
                </span>{" "}
                NPR {item.amount}
              </p>
              <div className="mt-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item.status === 'Accepted' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  item.status === 'Declined' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                  item.status === 'Completed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                  item.status === 'Cancelled' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                }`}>
                  Status: {item.status}
                </span>
              </div>
              {item.payment && (
                <p className="mt-2 text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
                  <span className="text-xl">✓</span> Payment Completed
                </p>
              )}
            </div>
            <div>
              {/*This empty div is for placed the button at right side in mbl view*/}
            </div>

            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && !item.payment && item.status !== 'Declined' && item.status !== 'Cancelled' && (
                <button 
                  onClick={() => makePayment(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 rounded border dark:text-gray-300 active:scale-[0.97] active:ease-out hover:bg-indigo-700 hover:text-white transition-all duration-300"
                >
                  Pay with eSewa
                </button>
              )}
              {!item.cancelled && item.status !== 'Completed' && item.status !== 'Cancelled' && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 rounded border dark:text-gray-300 active:scale-[0.97] active:ease-out hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Cancel appointment
                </button>
              )}
              {(item.cancelled || item.status === 'Cancelled') && (
                <button className="text-red-500 text-sm  text-center sm:min-w-48 py-2 rounded border">
                  Appointment Cancelled
                </button>
              )}
              {item.status === 'Completed' && (
                <button className="text-blue-500 text-sm  text-center sm:min-w-48 py-2 rounded border">
                  Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
