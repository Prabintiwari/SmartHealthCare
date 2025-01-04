import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faHome,
  faUserGroup,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const { aToken } = useContext(AdminContext);

  return (
    <div className="min-h-[90vh] border-r bg-white dark:bg-slate-800 dark:border-slate-700">
      {aToken && (
        <ul className="flex flex-col items-center gap-5 mt-5">
          <NavLink to={"/admindashboard"} onClick={()=>{scrollTo(0,0)}} className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-indigo-100 dark:bg-slate-700 text-indigo-800 dark:text-white border-r-4 border-indigo-700" : ""}`}>
            <FontAwesomeIcon icon={faHome} />
            <p>Dashboard</p>
          </NavLink>
          <NavLink to={"/all-appointment"} onClick={()=>{scrollTo(0,0)}} className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-indigo-100 dark:bg-slate-700 text-indigo-800 dark:text-white border-r-4 border-indigo-700" : ""}`}>
            <FontAwesomeIcon icon={faCalendar} />
            <p>Appointment</p>
          </NavLink>
          <NavLink to={"/add-doctor"} onClick={()=>{scrollTo(0,0)}} className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-indigo-100 dark:bg-slate-700 text-indigo-800 dark:text-white border-r-4 border-indigo-700" : ""}`}>
            <FontAwesomeIcon icon={faUserPlus} />
            <p>Add Doctor</p>
          </NavLink>
          <NavLink to={"/doctor-list"} onClick={()=>{scrollTo(0,0)}} className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-indigo-100 dark:bg-slate-700 text-indigo-800 dark:text-white border-r-4 border-indigo-700" : ""}`}>
            <FontAwesomeIcon icon={faUserGroup} />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default SideBar;
