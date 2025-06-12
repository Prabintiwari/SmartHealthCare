import React from "react";
import { assets_frontend } from "../assets_frontend/assets";

const About = () => {
  return (
    <div className="px-4">
      <div className="text-center text-2xl text-gray-500 dark:text-gray-300 py-4">
        <p>
          ABOUT{" "}
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            {" "}
            US
          </span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 py-4 ">
        <img
          src={assets_frontend.about_image}
          className="w-full md:max-w-[400px]"
          alt=""
        />

        <div className="flex flex-col gap-6 justify-center md:w-2/4 text-sm text-gray-600 dark:text-gray-300">
          <p>
            Welcome to Smart-Health Care, Your trusted partner in managing your
            health needs conveniently and Effectively. At Smart-Health Care, we
            understanding the challanges individuals face in managing their
            health needs and we are here to help you overcome these challenges.
            We provide a platform that connects you to a wide range of
            healthcare providers and services, enabling you to access quality
            healthcare services at your convenience.
          </p>
          <p>
            Smart-Health Care is commited to exellence in healthcare technology.
            We continuously strive to enhance our platform. Integrating the
            latest advancements to improve users experience ans deliver superior
            service. Wheather you're booking your first appointment or managing
            ongoing care, Smart-Health Care is here to support you every step of
            the way.
          </p>
          <b className="text-gray-800 dark:text-gray-300">Our Vision</b>
          <p>
            Our vision at Smart-Health Care is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between doctors
            and patients, making it easier for you to access the care you need,
            When you need it.
          </p>
        </div>
      </div>
      <div>
        <p className=" text-xl my-4 uppercase items-center text-center">
          Why{" "}
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            choose Us?
          </span>
        </p>
        <div className="flex flex-col md:flex-row items-center  gap-8 md:gap-12 py-4">
          <div className=" w-full md:h-[170px] gap-5 text-[15px] rounded-lg px-4 lg:px-16 py-8 bg-indigo-600 text-white shadow-[20px_20px_20px_#0000008c] dark:shadow-[20px_20px_20px_#ffffff2c]">
            <b className="uppercase ">Efficiency:</b>
            <p>
              Streamined Appointment Scheduling That Fits Into Your Busy
              Lifecycle.
            </p>
          </div>
          <div className=" w-full md:h-[170px] gap-5 text-[15px] rounded-lg px-4 lg:px-16 py-8 bg-indigo-600 text-white shadow-[20px_20px_20px_#0000008c] dark:shadow-[20px_20px_20px_#ffffff2c]">
            <b className="uppercase ">Convenience:</b>
            <p>
              Access To Network Of Trusted Healthcare Proffession in Your Area.
            </p>
          </div>
          <div className=" w-full md:h-[170px] gap-5 text-[15px] rounded-lg px-4 lg:px-16 py-8 bg-indigo-600 text-white shadow-[20px_20px_20px_#0000008c] dark:shadow-[20px_20px_20px_#ffffff2c]">
            <b className="uppercase ">Personalization:</b>
            <p>
              Tailored Recomandation and Reminders To Help You Stay On Top Of
              Your Health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
