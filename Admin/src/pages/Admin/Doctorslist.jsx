import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext';

const Doctorslist = () => {
  const {doctors, aToken, getAllDoctors, changeAvailability} = useContext(AdminContext); 
  useEffect(() => {
    if (aToken) {
      getAllDoctors();
      
    }
  }, [aToken])
  return (
    <div className='m-5 max-h-[90vh] flex flex-col items-center overflow-y-scroll no-scrollbar'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap justify-center gap-4 pt-5 gap-y-6'>
        {
          doctors.map((item,index) => (
            <div key={index} className='border border-indigo-200 rounded-xl max-w-72 sm:max-w-56 overflow-hidden cursor-pointer group'>
              <img src={item.image} className='bg-indigo-50 group-hover:bg-indigo-600 transition-all duration-500' alt="" />
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium dark:text-gray-300'>{item.name}</p>
                <p className='text-zinc-600 dark:text-gray-300 text-sm'>{item.speciality}</p>
                <div className='flex mt-2 gap-2 items-center text-sm text-green-500'>
                  <input type="checkbox" className='cursor-pointer' onChange={()=> changeAvailability(item._id)} checked={item.available} />
                  <p>Available</p>
                </div>
              </div>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Doctorslist