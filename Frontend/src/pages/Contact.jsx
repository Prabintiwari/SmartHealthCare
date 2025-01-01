import React from "react";
import { assets_frontend } from "../assets_frontend/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl text-gray-500 dark:text-gray-300 py-4">
        <p>
          CONTACT{" "}
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            {" "}
            US
          </span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-12 py-4 ">
        <img
          src={assets_frontend.contact_image}
          className="w-full md:max-w-[400px]"
          alt=""
        />
        <div className="flex flex-col gap-6 justify-center md:w-2/4 text-sm text-gray-600 dark:text-gray-300">
          <p>Address: Kalanki, Kathmandu, Nepal</p>
          <p>
            Call Us.: +977 9815027619 <br />
            Email: prabintiwari964@gmail.com
          </p>
          <p>Support: 24/7 Support</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
