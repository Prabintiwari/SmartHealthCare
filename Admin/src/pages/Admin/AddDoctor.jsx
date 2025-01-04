import React, { useContext, useState } from "react";
import { assets_admin } from "../../assets_admin/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [show, setShow] = useState(false);
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Please upload doctor image");
      }
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      // console log formdata

      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        {
          headers: {
            aToken,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 Year");
        setFees("");
        setSpeciality("General physician");
        setFees("");
        setDegree("");
        setAddress1("");
        setAddress2("");
        setAbout("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("error.message");
      console.log(error);
    }
  };
  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full ">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white dark:bg-slate-800 px-8 py-8 border border-indigo-700 rounded w-full sm:max-w-4xl max-h-[80vh] overflow-y-scroll no-scrollbar">
        <div className="flex items-center gap-4 mb-8 text-gray-500 dark:text-white">
          {/*Upload Doctor Image*/}

          <div className="relative">
            <img
              src={
                docImg ? URL.createObjectURL(docImg) : assets_admin.upload_area
              }
              className="w-16 h-16 bg-gray-100 rounded-full cursor-pointer"
              alt=""
            />
            <label htmlFor="doc-img">
              <FontAwesomeIcon
                icon={faCamera}
                className="absolute left-11 bottom-1 text-xs text-gray-600 bg-gray-300 rounded-full p-1 cursor-pointer"
              />
            </label>
          </div>
          <input
            type="file"
            id="doc-img"
            onChange={(e) => setDocImg(e.target.files[0])}
            hidden
          />
          <p>
            Upload doctor <br /> picture
          </p>
        </div>

        {/* Form for adding doctor */}

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600 dark:text-white">
          <div className="w-full lg:flex-1 flex flex-col gap-5">
            {/* Doctor Name */}
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Name</p>
              <input
                className="border focus:border-indigo-700 rounded outline-none px-3 py-2 text-gray-700"
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Name"
                required
              />
            </div>
            {/* Doctor Email */}
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                className="border focus:border-indigo-700 rounded outline-none px-3 py-2 text-gray-700"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
                required
              />
            </div>
            {/* Doctor Password */}
            <div className="relative flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input
                className="border focus:border-indigo-700 rounded outline-none px-3 py-2 text-gray-700"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={show ? "text" : "password"}
                placeholder="Password"
                required
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute top-10 right-2 text-sm items-center text-gray-600"
              >
                {show ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </span>
            </div>
            {/* Doctor Experience */}
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Experience</p>
              <select
                className="border focus:border-indigo-700 rounded outline-none px-3 py-2 text-gray-700"
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                name=""
                id=""
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>
            {/* Doctor Fees */}
            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                className="border focus:border-indigo-700 rounded outline-none px-3 py-2 text-gray-700"
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                type="number"
                placeholder="fees"
                required
              />
            </div>
          </div>
          <div className="w-full lg:flex-1 flex flex-col gap-5">
            {/* Doctor Speciality */}
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Specialtiy</p>
              <select
                className="border focus:border-indigo-700 rounded outline-none px-3 py-2 text-gray-700"
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                name=""
                id=""
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            {/* Doctor Education */}
            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input
                className="border focus:border-indigo-700 rounded outline-none px-3 py-2 text-gray-700"
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                type="text"
                placeholder="Education"
                required
              />
            </div>
            {/* Doctor Address */}
            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              {/* Address 1 */}
              <input
                className="border focus:border-indigo-700 rounded outline-none px-3 py-2 text-gray-700"
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                type="text"
                placeholder="Address 1"
                required
              />
              {/* Address 2 */}
              <input
                className="border focus:border-indigo-700 rounded outline-none px-3 py-2 text-gray-700"
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                type="text"
                placeholder="Address 2"
                required
              />
            </div>
          </div>
        </div>
        {/* About Doctor */}
        <div>
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea
            className="w-full pt-2 border focus:border-indigo-700 rounded outline-none px-3 py-2 text-gray-700"
            placeholder="Write about doctor"
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            rows={5}
            required
          />
        </div>
        <button className="bg-indigo-700 px-10 py-3 mt-3 text-white rounded-full active:scale-[0.97] active:duration-300 active:ease-out">
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
