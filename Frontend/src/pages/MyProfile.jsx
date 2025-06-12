import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);
  const [editMode, setEditMode] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {

      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("dob", userData.dob);
      formData.append("gender", userData.gender)

      image && formData.append("image", image);

      const { data } = await axios.post(backendUrl + "/api/user/update-profile", formData, { headers:{ token}});
      if(data.success){
        toast.success(data.message);
        await loadUserProfileData();
        setEditMode(false);
        setImage(false);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <div className="max-w-lg flex flex-col gap-4 text-sm">
        {editMode ? (
          <div className="relative inline-block cursor-pointer">
            <img
              src={image ? URL.createObjectURL(image) : userData.image}
              className="w-36 rounded opacity-75"
              alt=""
            />
            <label htmlFor="image">
              <FontAwesomeIcon
                icon={faCamera}
                className="absolute left-[120px] -bottom-2 text-2xl text-gray-600 bg-gray-300 rounded-full p-1 cursor-pointer"
              />
            </label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              hidden
            />
          </div>
        ) : (
          <img src={userData.image} className="max-w-36 rounded" alt="" />
        )}

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
                  value={userData.address.line1}
                  className="bg-gray-100 dark:bg-slate-800 outline-none max-w-40"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  type="text"
                />
                <br />
                Line2:{" "}
                <input
                  value={userData.address.line2}
                  className="bg-gray-100 dark:bg-slate-800 mt-5 outline-none max-w-40"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  type="text"
                />
              </p>
            ) : (
              <p>
                Line1:{userData.address.line1}
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
            {editMode ? (
              <button
                className="border border-indigo-500 px-8 py-2 rounded-full active:scale-[0.97] active:duration-100 active:ease-out"
                onClick={updateUserProfileData}
              >
                Save Information
              </button>
            ) : (
              <button
              className="border border-indigo-500 px-8 py-2 rounded-full active:scale-[0.97] active:duration-100 active:ease-out"
              onClick={() => setEditMode(true)}
            >
              Edit
            </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default MyProfile;
