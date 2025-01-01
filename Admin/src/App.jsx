import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import { AdminContext } from "./context/AdminContext";

const App = () => {
  const { aToken } = useContext(AdminContext);
  return aToken ? (
    <div className="h-screen">
      <ToastContainer />
    </div>
  ) : (
    <div className="h-screen">
      <Login />
      <ToastContainer />
    </div>
  );
};

export default App;
