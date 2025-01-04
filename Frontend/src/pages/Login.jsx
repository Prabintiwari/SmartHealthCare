import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          password,
          email,
          
        })
        if (data.success) {
          setToken(data.token);
          localStorage.setItem("token", data.token);
        }else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (data.success) {
          setToken(data.token);
          localStorage.setItem("token", data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/")
    }
  },[token])

  return (
    <div className=" flex justify-center items-center">
      <div className="flex flex-col gap-3 m-auto items-start min-w-80 sm:min-w-96 border border-slate-400 rounded-xl text-sm p-8 shadow-2xl backdrop-filter backdrop-blur-sm relative">
        <p className="text-2xl sm:text-3xl font-medium text-center">
          {state === "Sign Up" ? "Create an Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "Sign Up" : "Sign In"} to book an
          appointment.{" "}
        </p>

        <form onSubmit={onSubmitHandler}>
          {/* Name field */}

          {state === "Sign Up" && (
            <div className="w-full relative my-8">
              <input
                type="name"
                name="name"
                placeholder=""
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                className="block w-60 sm:w-72 py-2 px-0 border-0 focus:outline-none bg-transparent border-b-2 border-gray-400  focus:border-blue-500 focus: peer"
              />
              <label
                htmlFor="name"
                className="absolute text-sm text-gray-600  duration-300 transform -translate-y-6 scale-90 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6"
              >
                Your Name
              </label>
            </div>
          )}

          {/* Email field */}

          <div className="w-full relative my-8">
            <input
              type="email"
              name="email"
              placeholder=""
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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

          {/* Password field */}

          <div className="w-full relative my-8">
            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder=""
              onChange={(e) => setPassword(e.target.value)}
              value={password}
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
            className="absolute top-3 right-1 text-gray-600"
          >
            {show ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </span>
          </div>

          <div className="flex justify-between items-center  text-sm sm:text-base">
            <div className="flex items-center">
              <input type="checkbox" />
              <label htmlFor="Remember me" className=" mx-2">
                Remember me
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mb-4 text-[18px] mt-6 p-2 text-gray-300 rounded-lg bg-indigo-700 hover:bg-indigo-800  duration-500"
          >
            {state === "Sign Up" ? "Create Account" : "Login"}
          </button>

          <div>
            {state === "Sign Up" ? (
              <p>
                Already Have an account?{" "}
                <span
                  onClick={() => setState("Login")}
                  className="text-indigo-700 underline cursor-pointer"
                >
                  Login here
                </span>
              </p>
            ) : (
              <p>
                Create a new account?{" "}
                <span
                  onClick={() => setState("Sign Up")}
                  className="text-indigo-700 underline cursor-pointer"
                >
                  Click here
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
