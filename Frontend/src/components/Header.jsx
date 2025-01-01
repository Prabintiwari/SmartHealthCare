import React from 'react'
import { assets_frontend } from '../assets_frontend/assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap rounded-lg md:px-10 px-6 lg:px-12 bg-indigo-700 text-white shadow-lg dark:bg-gray-800'>

        {/* Left side */}
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vh]'>
            <p className='text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight'>Book Appointments <br /> With Trusted Doctors</p>
            <div className='flex flex-col md:flex-row items-center gap-4 text-sm md:text-base font-light'>
                <img className='w-28 ' src={assets_frontend.group_profiles} alt="" />
                <p>Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block' /> schedule your appointment hassle-free.</p>
            </div>
            <a href={'#speciality'} className='flex items-center gap-2 bg-white text-gray-600 px-8 py-3 rounded-full text-sm m-auto md:m-0 active:scale-[0.97] active:duration-300 active:ease-out'>Book Appointment <FontAwesomeIcon icon={faArrowRight}/> </a>
        </div>

        {/* Right side */}
        <div className='md:w-1/2 flex items-center justify-center md:justify-end md:pr-10 md:pt-10 sm:pb-0'>
          <img className='' src={assets_frontend.header_img} alt="" />
        </div>
    </div>
  )
}

export default Header