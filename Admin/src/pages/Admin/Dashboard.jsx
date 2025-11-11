import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserMd, faCalendarCheck, faUsers, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons'

const Dashboard = () => {
  const { dashData, getDashData, aToken, cancelAppointment } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  // Auto-refresh dashboard data every 30 seconds
  useEffect(() => {
    if (aToken) {
      const interval = setInterval(() => {
        getDashData()
      }, 30000) // Refresh every 30 seconds

      return () => clearInterval(interval)
    }
  }, [aToken])

  const calculateAge = (dob) => {
    const today = new Date()
    const birthDate = new Date(dob)
    let age = today.getFullYear() - birthDate.getFullYear()
    return age
  }

  const handleRefresh = () => {
    getDashData()
  }

  return dashData && (
    <div className='m-5'>
      {/* Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
        <div className='bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border-l-4 border-blue-500'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-500 dark:text-gray-400 text-sm'>Total Doctors</p>
              <p className='text-3xl font-bold text-gray-800 dark:text-white'>{dashData.doctors}</p>
            </div>
            <div className='bg-blue-100 dark:bg-blue-900 p-4 rounded-full'>
              <FontAwesomeIcon icon={faUserMd} className='text-blue-500 text-2xl' />
            </div>
          </div>
        </div>

        <div className='bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border-l-4 border-green-500'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-500 dark:text-gray-400 text-sm'>Total Appointments</p>
              <p className='text-3xl font-bold text-gray-800 dark:text-white'>{dashData.appointments}</p>
            </div>
            <div className='bg-green-100 dark:bg-green-900 p-4 rounded-full'>
              <FontAwesomeIcon icon={faCalendarCheck} className='text-green-500 text-2xl' />
            </div>
          </div>
        </div>

        <div className='bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border-l-4 border-purple-500'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-500 dark:text-gray-400 text-sm'>Total Patients</p>
              <p className='text-3xl font-bold text-gray-800 dark:text-white'>{dashData.patients}</p>
            </div>
            <div className='bg-purple-100 dark:bg-purple-900 p-4 rounded-full'>
              <FontAwesomeIcon icon={faUsers} className='text-purple-500 text-2xl' />
            </div>
          </div>
        </div>

        <div className='bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border-l-4 border-yellow-500'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-500 dark:text-gray-400 text-sm'>Latest Appointments</p>
              <p className='text-3xl font-bold text-gray-800 dark:text-white'>{dashData.latestAppointments.length}</p>
            </div>
            <div className='bg-yellow-100 dark:bg-yellow-900 p-4 rounded-full'>
              <FontAwesomeIcon icon={faMoneyBillWave} className='text-yellow-500 text-2xl' />
            </div>
          </div>
        </div>
      </div>

      {/* Latest Appointments */}
      <div className='bg-white dark:bg-slate-800 rounded-lg shadow-md'>
        <div className='p-5 border-b dark:border-gray-700 flex justify-between items-center'>
          <h2 className='text-xl font-semibold text-gray-800 dark:text-white'>Latest Appointments</h2>
          <button 
            onClick={handleRefresh}
            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2'
          >
            <span>🔄</span> Refresh
          </button>
        </div>
        <div className='p-5'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b dark:border-gray-700'>
                  <th className='text-left py-3 px-2 text-gray-600 dark:text-gray-300'>Patient</th>
                  <th className='text-left py-3 px-2 text-gray-600 dark:text-gray-300'>Doctor</th>
                  <th className='text-left py-3 px-2 text-gray-600 dark:text-gray-300'>Date & Time</th>
                  <th className='text-left py-3 px-2 text-gray-600 dark:text-gray-300'>Status</th>
                  <th className='text-left py-3 px-2 text-gray-600 dark:text-gray-300'>Payment</th>
                  <th className='text-left py-3 px-2 text-gray-600 dark:text-gray-300'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dashData.latestAppointments.map((item, index) => {
                  const patient = item.userId || item.userData;
                  const doctor = item.docId || item.docData;
                  
                  return (
                  <tr key={index} className='border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700'>
                    <td className='py-3 px-2'>
                      <div className='flex items-center gap-2'>
                        <img src={patient?.image} alt="" className='w-10 h-10 rounded-full object-cover' />
                        <div>
                          <p className='font-medium text-gray-800 dark:text-white'>{patient?.name}</p>
                          <p className='text-sm text-gray-500 dark:text-gray-400'>{patient?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className='py-3 px-2'>
                      <div className='flex items-center gap-2'>
                        <img src={doctor?.image} alt="" className='w-10 h-10 rounded-full object-cover' />
                        <p className='font-medium text-gray-800 dark:text-white'>{doctor?.name}</p>
                      </div>
                    </td>
                    <td className='py-3 px-2'>
                      <p className='text-gray-800 dark:text-white'>{item.slotDate}</p>
                      <p className='text-sm text-gray-500 dark:text-gray-400'>{item.slotTime}</p>
                    </td>
                    <td className='py-3 px-2'>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === 'Accepted' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        item.status === 'Declined' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                        item.status === 'Completed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className='py-3 px-2'>
                      {item.payment ? 
                        <span className='text-green-600 dark:text-green-400 font-medium'>✓ Paid</span> : 
                        <span className='text-red-600 dark:text-red-400 font-medium'>✗ Unpaid</span>
                      }
                    </td>
                    <td className='py-3 px-2'>
                      {!item.cancelled && item.status !== 'Cancelled' && (
                        <button 
                          onClick={() => cancelAppointment(item._id)}
                          className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm'
                        >
                          Cancel
                        </button>
                      )}
                      {item.cancelled && <span className='text-gray-500 dark:text-gray-400'>Cancelled</span>}
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard