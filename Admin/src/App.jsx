import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointment from "./pages/Admin/AllAppointment";
import Doctorslist from "./pages/Admin/Doctorslist";
import AddDoctor from "./pages/Admin/AddDoctor";

const App = () => {
  const { aToken } = useContext(AdminContext);
  return aToken ? (
    <div className="dark:bg-slate-900 dark:text-white">
      <ToastContainer />
      <Navbar />
      <div className="mt-[60px] flex items-start bg-[#f2f3ff]  dark:bg-slate-900">
        <SideBar />
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/admindashboard" element={<Dashboard />} />
          <Route path="/all-appointment" element={<AllAppointment />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<Doctorslist />} />
        </Routes>
      </div>
    </div>
  ) : (
    <div className="h-screen dark:bg-slate-900 dark:text-gray-300">
      <Login />
      <ToastContainer />
    </div>
  );
};

export default App;
