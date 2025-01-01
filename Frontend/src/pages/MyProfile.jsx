import React, { useState } from "react";
import { assets_frontend } from "../assets_frontend/assets";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Prabin Tiwari",
    image: assets_frontend.ProfilePic,
    email: "prabintiwari964@gmail.com",
    phone: "9815027619",
    address: {
      line1: "Kathmandu, Nepal",
      line2: "Jhapa, Nepal",
    },
    gender: "male",
    dob: "2002-07-08",
  });
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="max-w-lg flex flex-col gap-4 text-sm">
      <img src={userData.image} className="max-w-36 rounded" alt="" />

      {/* Name */}

      {editMode ? (
        <input
          type="text"
          className=" text-3xl font-medium max-w-60 mt-4 bg-gray-100 dark:bg-slate-800 outline-none "
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className=" text-3xl font-medium max-w-60 mt-4 text-neutral-800 dark:text-gray-300">
          {userData.name}
        </p>
      )}
      <hr className="bg-zinc-400 h-[1px] border-none" />

      {/* Email,phone & address */}

      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_2fr] gap-y-2.5 mt-3 text-neutral-700 dark:text-neutral-400">
          <p className="font-medium">Email Id:</p>
          <p>{userData.email}</p>

          {/* Phone */}

          <p className="font-medium">Phone:</p>
          {editMode ? (
            <input
              type="text"
              className="bg-gray-100 dark:bg-slate-800 outline-none max-w-40"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p>{userData.phone}</p>
          )}
          {/* Address */}
          <p className="font-medium">Address:</p>
          {editMode ? (
            <p>
              Line1:{" "}
              <input
                value= {userData.address.line1}
                className="bg-gray-100 dark:bg-slate-800 outline-none max-w-40"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { line1: e.target.value },
                  }))
                }
                type="text"
              />
              <br />
              Line2:{" "}
              <input
                value= {userData.address.line2}
                className="bg-gray-100 dark:bg-slate-800 mt-5 outline-none max-w-40"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { line2: e.target.value },
                  }))
                }
                type="text"
              />
            </p>
          ) : (
            <p>
              Line1: {userData.address.line1}
              <br />
              <br />
              Line2: {userData.address.line2}
            </p>
          )}
        </div>
      </div>

      {/* Gender & Birthday */}

      <div>
        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_2fr] gap-y-2.5 mt-3 text-neutral-700 dark:text-neutral-400">
          <p className="font-medium">Gender:</p>
          {editMode ? (
            <select
              className="bg-gray-100 dark:bg-slate-800 outline-none max-w-40"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              value={userData.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p>{userData.gender}</p>
          )}
          
          {/* Birthday */}

          <p className="font-medium">Birthday:</p>
          {editMode ? (
            <input
              type="date"
              className="bg-gray-100 max-w-40 dark:bg-slate-800 outline-none"
              value={userData.dob}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
          ) : (
            <p>{userData.dob}</p>
          )}
        </div>

        <div className="mt-10">
          <button
            className="border border-indigo-500 px-8 py-2 rounded-full active:scale-[0.97] active:duration-100 active:ease-out"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "Save Information" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
