import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets_frontend } from "../assets_frontend/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronDown,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../context/AppContext";

function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();
  const { token, setToken } = useContext(AppContext);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

 
  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    scrollTo(0, 0);
  };

  const navitems = (
    <>
      {[
        { name: "HOME", path: "/" },
        { name: "ALL DOCTORS", path: "/doctors" },
        { name: "ABOUT", path: "/about" },
        { name: "CONTACT", path: "/contact" },
      ].map((item) => (
        <li key={item.path}>
          <NavLink
            to={item.path}
            onClick={() => {
              scrollTo(0, 0);
            }}
            className={({ isActive }) =>
              `px-4 py-2 rounded ${
                isActive
                  ? "bg-gray-800 text-white dark:bg-white dark:text-gray-900"
                  : `hover:bg-gray-200 dark:hover:bg-gray-800 ${
                      sticky ? "hover:bg-gray-300" : ""
                    }`
              } `
            }
          >
            {item.name}
          </NavLink>
        </li>
      ))}
    </>
  );

  return (
    <>
      <div
        className={` fixed top-0 left-0 right-0 z-50 dark:bg-slate-900 dark:text-white ${
          sticky
            ? "shadow-md bg-base-300 dark:bg-slate-950 dark:text-white  duration-500 transition-all ease-in-out"
            : ""
        }`}
      >
        {/* navbar start*/}

        <div className="navbar border-b md:px-10 border-b-gray-400 flex justify-between">
          {/* navbar for mbl */}

          <div className="navbar-start ">
            <FontAwesomeIcon
              className="w-6 h-6 cursor-pointer px-3 lg:hidden "
              icon={showNav ? faXmark : faBars}
              onClick={() => setShowNav(!showNav)}
            />

            <div
              className={`absolute bg-stone-100 dark:bg-slate-900 border border-indigo-500 rounded-2xl z-20 left-0 w-screen pl-6 shadow-2xl transition-all  ease-in ${
                showNav ? "top-16" : "top-[-300px]"
              }`}
            >
              <ul className="flex flex-col gap-4 py-4">
                <NavLink
                  to={"/"}
                  onClick={() => {
                    setShowNav(!showNav);
                    scrollTo(0, 0);
                  }}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded ${
                      isActive
                        ? "bg-gray-800 text-white dark:bg-white dark:text-gray-900"
                        : `hover:bg-gray-200 dark:hover:bg-gray-800 
                    }`
                    } `
                  }
                >
                  HOME
                </NavLink>
                <NavLink
                  to={"/doctors"}
                  onClick={() => {
                    setShowNav(!showNav);
                    scrollTo(0, 0);
                  }}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded ${
                      isActive
                        ? "bg-gray-800 text-white dark:bg-white dark:text-gray-900"
                        : `hover:bg-gray-200 dark:hover:bg-gray-800
                    }`
                    } `
                  }
                >
                  ALL DOCTORS
                </NavLink>
                <NavLink
                  to={"/about"}
                  onClick={() => {
                    setShowNav(!showNav);
                    scrollTo(0, 0);
                  }}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded ${
                      isActive
                        ? "bg-gray-800 text-white dark:bg-white dark:text-gray-900"
                        : `hover:bg-gray-200 dark:hover:bg-gray-800
                    }`
                    } `
                  }
                >
                  ABOUT
                </NavLink>
                <NavLink
                  to={"/contact"}
                  onClick={() => {
                    setShowNav(!showNav);
                    scrollTo(0, 0);
                  }}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded ${
                      isActive
                        ? "bg-gray-800 text-white dark:bg-white dark:text-gray-900"
                        : `hover:bg-gray-200 dark:hover:bg-gray-800
                    }`
                    } `
                  }
                >
                  CONTACT
                </NavLink>
              </ul>
            </div>

            <p
              onClick={() => {
                navigate("/");
                scrollTo(0, 0);
              }}
              className="font-medium sm:font-bold cursor-pointer text-lg md:text-xl text-indigo-800 sm:pl-10 dark:text-indigo-600"
            >
              Smart-Health Care
            </p>
          </div>

          {/* navbar for desktop */}

          <div className="navbar-center hidden lg:flex ">
            <ul className="flex gap-5  px-1 text-lg font-medium">{navitems}</ul>
          </div>

          <div className="w[5%] ml-20  gap-5 ">
            {/* theme */}

            <label className="swap swap-rotate ">
              <input
                type="checkbox"
                className="theme-controller"
                checked={theme === "dark"}
              />

              <svg
                className="swap-off  h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              <svg
                className="swap-on h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>

            {/* login and profile */}

            <div className="">
              {token
                ? ({
                    /* Profile Pic*/
                  },
                  (
                    <div
                      className={` flex items-center cursor-pointer group relative`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="avatar">
                          <div className="w-14 md:w-16 rounded-full">
                            <img src={assets_frontend.ProfilePic} />
                          </div>
                        </div>
                        <FontAwesomeIcon icon={faChevronDown} />
                      </div>

                      <div
                        className={`absolute top-0 right-0 md:-right-5 mt-16 text-sm sm:text-base md:font-medium hidden text-gray-600  z-10  group-hover:block`}
                      >
                        <div className="min-w-48 bg-stone-100 rounded  flex flex-col gap-2 p-4 items-center">
                          <p
                            onClick={() => {
                              navigate("/my-profile");
                              scrollTo(0, 0);
                            }}
                            className="hover:text-black cursor-pointer"
                          >
                            MyProfile
                          </p>
                          <p
                            onClick={() => {
                              navigate("/my-appointments");
                              scrollTo(0, 0);
                            }}
                            className="hover:text-black cursor-pointer"
                          >
                            My Appointments
                          </p>
                          <p
                            onClick={logout}
                            className="hover:text-black cursor-pointer"
                          >
                            Logout
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                : ({
                    /* Login Button*/
                  },
                  (
                    <div>
                      <button
                        className="hidden md:block btn btn-outline  dark:bg-white dark:hover:bg-indigo-600 dark:border-none "
                        onClick={() => navigate("/login")}
                      >
                        Create account
                      </button>
                      {/* for mbl */}

                      <button
                        className="md:hidden btn btn-sm btn-outline dark:bg-indigo-600  dark:text-white dark:border-none"
                        onClick={() => navigate("/login")}
                      >
                        Create account
                      </button>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
