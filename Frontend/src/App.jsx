import React, { useContext, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appontment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from "./context/AppContext";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const {token, setToken}= useContext(AppContext)
  const location = useLocation();
  return (
    <div className="">
      <ToastContainer />
      {showLogin && !token? <Login showLogin={showLogin} setShowLogin={setShowLogin} /> : <> </>}
      <Navbar showLogin={showLogin} setShowLogin={setShowLogin}/>

      <div className="pt-28 min-h-screen px-4 sm:px-[5%] dark:bg-slate-900 dark:text-gray-300">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:speciality" element={<Doctors />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/appointment/:docId" element={<Appointment showLogin={showLogin} setShowLogin={setShowLogin} />} />
        </Routes>
        {location.pathname !== "/login" && <Footer />}
      </div>
    </div>
  );
}

export default App;
