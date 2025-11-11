import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBillWave, faCalendarCheck, faUsers, faClipboardList } from '@fortawesome/free-solid-svg-icons'

const DoctorDashboard = () => {
  const { dashData, getDashData, dToken, acceptAppointment, declineAppointment, completeAppointment } = useContext(DoctorContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  // Auto-refresh dashboard data every 30 seconds
  useEffect(() => {
    if (dToken) {
      const interval = setInterval(() => {
        getDashData()
      }, 30000) // Refresh every 30 seconds

      return () => clearInterval(interval)
    }
  }, [dToken])

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
              <p className='text-gray-500 dark:text-gray-400 text-sm'>Earnings</p>
              <p className='text-3xl font-bold text-gray-800 dark:text-white'>NPR {dashData.earnings}</p>
            </div>
            <div className='bg-blue-100 dark:bg-blue-900 p-4 rounded-full'>
              <FontAwesomeIcon icon={faMoneyBillWave} className='text-blue-500 text-2xl' />
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
              <FontAwesomeIcon icon={faClipboardList} className='text-yellow-500 text-2xl' />
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
                  <th className='text-left py-3 px-2 text-gray-600 dark:text-gray-300'>Date & Time</th>
                  <th className='text-left py-3 px-2 text-gray-600 dark:text-gray-300'>Fees</th>
                  <th className='text-left py-3 px-2 text-gray-600 dark:text-gray-300'>Status</th>
                  <th className='text-left py-3 px-2 text-gray-600 dark:text-gray-300'>Payment</th>
                  <th className='text-left py-3 px-2 text-gray-600 dark:text-gray-300'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dashData.latestAppointments.map((item, index) => (
                  <tr key={index} className='border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700'>
                    <td className='py-3 px-2'>
                      <div className='flex items-center gap-2'>
                        <img src={item.userData.image} alt="" className='w-10 h-10 rounded-full object-cover' />
                        <div>
                          <p className='font-medium text-gray-800 dark:text-white'>{item.userData.name}</p>
                          <p className='text-sm text-gray-500 dark:text-gray-400'>{item.userData.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className='py-3 px-2'>
                      <p className='text-gray-800 dark:text-white'>{item.slotDate}</p>
                      <p className='text-sm text-gray-500 dark:text-gray-400'>{item.slotTime}</p>
                    </td>
                    <td className='py-3 px-2'>
                      <p className='font-semibold text-green-600 dark:text-green-400'>NPR {item.amount}</p>
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
                      <div className='flex gap-2'>
                        {item.status === 'Pending' && (
                          <>
                            <button 
                              onClick={() => acceptAppointment(item._id)}
                              className='bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs'
                            >
                              Accept
                            </button>
                            <button 
                              onClick={() => declineAppointment(item._id)}
                              className='bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs'
                            >
                              Decline
                            </button>
                          </>
                        )}
                        {item.status === 'Accepted' && !item.isCompleted && (
                          <button 
                            onClick={() => completeAppointment(item._id)}
                            className='bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs'
                          >
                            Complete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard
