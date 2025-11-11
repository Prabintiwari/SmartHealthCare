import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext)
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
        about: profileData.about
      }

      const { data } = await axios.post(
        backendUrl + '/api/doctor/update-profile',
        updateData,
        { headers: { token: dToken } }
      )

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return profileData && (
    <div className='m-5'>
      <div className='bg-white dark:bg-slate-800 rounded-lg shadow-md max-w-4xl mx-auto'>
        <div className='p-6 border-b dark:border-gray-700'>
          <h2 className='text-2xl font-semibold text-gray-800 dark:text-white'>Doctor Profile</h2>
        </div>
        
        <div className='p-6'>
          <div className='flex flex-col sm:flex-row gap-6'>
            {/* Profile Image */}
            <div className='flex-shrink-0'>
              <img 
                src={profileData.image} 
                alt={profileData.name}
                className='w-48 h-48 rounded-lg object-cover border-4 border-gray-200 dark:border-gray-600'
              />
            </div>

            {/* Profile Info */}
            <div className='flex-1'>
              <div className='mb-4'>
                <h3 className='text-2xl font-bold text-gray-800 dark:text-white mb-1'>
                  {profileData.name}
                </h3>
                <p className='text-gray-600 dark:text-gray-400'>{profileData.email}</p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                <div>
                  <label className='text-sm text-gray-500 dark:text-gray-400'>Degree</label>
                  <p className='font-medium text-gray-800 dark:text-white'>{profileData.degree}</p>
                </div>
                <div>
                  <label className='text-sm text-gray-500 dark:text-gray-400'>Speciality</label>
                  <p className='font-medium text-gray-800 dark:text-white'>{profileData.speciality}</p>
                </div>
                <div>
                  <label className='text-sm text-gray-500 dark:text-gray-400'>Experience</label>
                  <p className='font-medium text-gray-800 dark:text-white'>{profileData.experience}</p>
                </div>
                <div>
                  <label className='text-sm text-gray-500 dark:text-gray-400'>Consultation Fees</label>
                  {isEdit ? (
                    <input
                      type='number'
                      value={profileData.fees}
                      onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                      className='w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-gray-600 dark:text-white'
                    />
                  ) : (
                    <p className='font-medium text-green-600 dark:text-green-400'>NPR {profileData.fees}</p>
                  )}
                </div>
              </div>

              <div className='mb-4'>
                <label className='text-sm text-gray-500 dark:text-gray-400'>Address</label>
                {isEdit ? (
                  <div className='space-y-2 mt-1'>
                    <input
                      type='text'
                      placeholder='Line 1'
                      value={profileData.address.line1}
                      onChange={(e) => setProfileData(prev => ({ 
                        ...prev, 
                        address: { ...prev.address, line1: e.target.value } 
                      }))}
                      className='w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-gray-600 dark:text-white'
                    />
                    <input
                      type='text'
                      placeholder='Line 2'
                      value={profileData.address.line2}
                      onChange={(e) => setProfileData(prev => ({ 
                        ...prev, 
                        address: { ...prev.address, line2: e.target.value } 
                      }))}
                      className='w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-gray-600 dark:text-white'
                    />
                  </div>
                ) : (
                  <p className='font-medium text-gray-800 dark:text-white'>
                    {profileData.address.line1}, {profileData.address.line2}
                  </p>
                )}
              </div>

              <div className='mb-4'>
                <label className='text-sm text-gray-500 dark:text-gray-400'>About</label>
                {isEdit ? (
                  <textarea
                    value={profileData.about}
                    onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                    rows='4'
                    className='w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-gray-600 dark:text-white mt-1'
                  />
                ) : (
                  <p className='text-gray-700 dark:text-gray-300 mt-1'>{profileData.about}</p>
                )}
              </div>

              <div className='mb-4'>
                <label className='flex items-center gap-2 cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={profileData.available}
                    onChange={(e) => isEdit && setProfileData(prev => ({ ...prev, available: e.target.checked }))}
                    disabled={!isEdit}
                    className='w-5 h-5 text-blue-600 rounded focus:ring-blue-500'
                  />
                  <span className='text-gray-700 dark:text-gray-300 font-medium'>
                    Available for appointments
                  </span>
                </label>
              </div>

              <div className='flex gap-3'>
                {isEdit ? (
                  <>
                    <button
                      onClick={updateProfile}
                      className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors'
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setIsEdit(false)
                        getProfileData()
                      }}
                      className='bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors'
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEdit(true)}
                    className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors'
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
