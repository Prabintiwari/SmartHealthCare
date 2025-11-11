import React, { useContext, useState } from "react";
import { assets_admin } from "../assets_admin/assets";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [show, setShow] = useState(false);
  const [state, setState] = useState("Admin");
  const [email, SetEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/doctor/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start min-w-80 sm:min-w-96 border border-slate-400 rounded-xl text-sm p-8 shadow-2xl backdrop-filter backdrop-blur-sm relative">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-indigo-700">{state}</span> Login
        </p>
        <div className="w-full relative my-2">
          <input
            onChange={(e) => SetEmail(e.target.value)}
            value={email}
            type="email"
            name="email"
            placeholder=""
            required
            className="block w-60 sm:w-72 py-2 px-0 border-0 focus:outline-none bg-transparent border-b-2 border-gray-400  focus:border-blue-500 focus: peer"
          />
          <label
            htmlFor="email"
            className="absolute text-sm text-gray-600  duration-300 transform -translate-y-6 scale-90 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6"
          >
            Your Email
          </label>
        </div>
        <div className="w-full relative my-2">
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type={show ? "text" : "password"}
            name="password"
            placeholder=""
            required
            className="block  w-60 sm:w-72 py-2 px-0 border-0 focus:outline-none border-b-2 bg-transparent border-gray-400  focus:border-blue-500 focus: peer"
          />

          <label
            htmlFor="password"
            className="absolute text-sm text-gray-600  duration-300 transform -translate-y-6 scale-90 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6"
          >
            Enter Password
          </label>
          <span
            onClick={() => setShow(!show)}
            className="absolute top-3 right-8 text-gray-600"
          >
            {show ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </span>
        </div>
        <button className="w-full text-white text-sm font-light px-14 py-3 rounded-full my-6 bg-indigo-600 active:scale-[0.97] active:duration-300 active:ease-out">
          Login
        </button>

        {state === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <span
              onClick={() => setState("Doctor")}
              className="text-indigo-700 underline cursor-pointer"
            >
              {" "}
              Click Here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              onClick={() => setState("Admin")}
              className="text-indigo-700 underline cursor-pointer"
            >
              {" "}
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
