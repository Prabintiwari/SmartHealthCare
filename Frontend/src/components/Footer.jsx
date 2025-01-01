import React from "react";

const Footer = () => {
  return (
    <div className="">
      <div className="flex flex-col sm:grid grid-cols-[2fr_1fr_1fr] gap-10 border-t-2 px-6 my-20 pt-6 md:px-10 lg:px-12">
        {/* Left section */}
        <div className="flex flex-col ">
          <p className="sm:font-bold cursor-pointer text-xl mb-5 text-indigo-800  dark:text-indigo-600">
            Smart-Health Care
          </p>
          <p className="w-full md:w-1/2 text-gray-600 leading-6 dark:text-white">
          Smart-HealthCare is a platform that connects patients with doctors. It helps patients to find the right doctor for their health issues. It also helps doctors to manage their appointments and patients.
          </p>
        </div>

        {/* Center section */}
        <div className="flex flex-col  gap-5">
          <p className="text-xl font-medium">Company</p>
          <ul className="flex flex-col gap-2 text-gray-600 dark:text-white">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy&Policy</li>
          </ul>
        </div>

        {/* Right section */}
        <div className="flex flex-col  gap-5">
          <p className="text-xl font-medium ">Get In Touch</p>
          <ul className="flex flex-col gap-2 text-gray-600 dark:text-white">
            <li>977-9815027619</li>
            <li>Prabintiwari964@gmail.com</li>
          </ul>
        </div>
      </div>
      {/* copyright text */}
      <div>
        <hr />
        <p className="text-sm text-center py-2">
          © 2024 Smart-Health Care. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
