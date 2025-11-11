import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const DoctorAppointments = () => {
  const { appointments, getAppointments, dToken, acceptAppointment, declineAppointment, completeAppointment } = useContext(DoctorContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  // Auto-refresh appointments every 30 seconds
  useEffect(() => {
    if (dToken) {
      const interval = setInterval(() => {
        getAppointments()
      }, 30000) // Refresh every 30 seconds

      return () => clearInterval(interval)
    }
  }, [dToken])

  const calculateAge = (dob) => {
    if (!dob) return 'N/A'
    const today = new Date()
    const birthDate = new Date(dob)
    let age = today.getFullYear() - birthDate.getFullYear()
    return age
  }

  const handleRefresh = () => {
    getAppointments()
  }

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <div className='bg-white dark:bg-slate-800 rounded-lg shadow-md'>
        <div className='p-5 border-b dark:border-gray-700 flex justify-between items-center'>
          <h2 className='text-2xl font-semibold text-gray-800 dark:text-white'>My Appointments</h2>
          <div className='flex items-center gap-3'>
            <button 
              onClick={handleRefresh}
              className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2'
            >
              <span>🔄</span> Refresh
            </button>
            <span className='bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full font-semibold'>
              Total: {appointments.length}
            </span>
          </div>
        </div>
        <div className='p-5'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b-2 dark:border-gray-700'>
                  <th className='text-left py-4 px-3 text-gray-700 dark:text-gray-300 font-semibold'>#</th>
                  <th className='text-left py-4 px-3 text-gray-700 dark:text-gray-300 font-semibold'>Patient</th>
                  <th className='text-left py-4 px-3 text-gray-700 dark:text-gray-300 font-semibold'>Age</th>
                  <th className='text-left py-4 px-3 text-gray-700 dark:text-gray-300 font-semibold'>Date & Time</th>
                  <th className='text-left py-4 px-3 text-gray-700 dark:text-gray-300 font-semibold'>Fees</th>
                  <th className='text-left py-4 px-3 text-gray-700 dark:text-gray-300 font-semibold'>Status</th>
                  <th className='text-left py-4 px-3 text-gray-700 dark:text-gray-300 font-semibold'>Payment</th>
                  <th className='text-left py-4 px-3 text-gray-700 dark:text-gray-300 font-semibold'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments && appointments.length > 0 ? (
                  appointments.map((item, index) => (
                    <tr key={index} className='border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors'>
                      <td className='py-4 px-3 text-gray-800 dark:text-white font-medium'>{index + 1}</td>
                      <td className='py-4 px-3'>
                        <div className='flex items-center gap-3'>
                          <img src={item.userData.image} alt="" className='w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600' />
                          <div>
                            <p className='font-semibold text-gray-800 dark:text-white'>{item.userData.name}</p>
                            <p className='text-sm text-gray-500 dark:text-gray-400'>{item.userData.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className='py-4 px-3 text-gray-800 dark:text-white'>
                        {calculateAge(item.userData.dob)} years
                      </td>
                      <td className='py-4 px-3'>
                        <p className='font-medium text-gray-800 dark:text-white'>{item.slotDate}</p>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>{item.slotTime}</p>
                      </td>
                      <td className='py-4 px-3'>
                        <p className='font-semibold text-green-600 dark:text-green-400'>NPR {item.amount}</p>
                      </td>
                      <td className='py-4 px-3'>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.status === 'Accepted' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          item.status === 'Declined' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                          item.status === 'Completed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                          item.status === 'Cancelled' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className='py-4 px-3'>
                        {item.payment ? 
                          <span className='text-green-600 dark:text-green-400 font-bold flex items-center gap-1'>
                            <span className='text-xl'>✓</span> Paid
                          </span> : 
                          <span className='text-red-600 dark:text-red-400 font-bold flex items-center gap-1'>
                            <span className='text-xl'>✗</span> Unpaid
                          </span>
                        }
                      </td>
                      <td className='py-4 px-3'>
                        <div className='flex gap-2'>
                          {item.status === 'Pending' && (
                            <>
                              <button 
                                onClick={() => acceptAppointment(item._id)}
                                className='bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1'
                                title="Accept Appointment"
                              >
                                <FontAwesomeIcon icon={faCheck} />
                                Accept
                              </button>
                              <button 
                                onClick={() => declineAppointment(item._id)}
                                className='bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1'
                                title="Decline Appointment"
                              >
                                <FontAwesomeIcon icon={faTimes} />
                                Decline
                              </button>
                            </>
                          )}
                          {item.status === 'Accepted' && !item.isCompleted && (
                            <button 
                              onClick={() => completeAppointment(item._id)}
                              className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1'
                              title="Mark as Completed"
                            >
                              <FontAwesomeIcon icon={faCheckCircle} />
                              Complete
                            </button>
                          )}
                          {(item.status === 'Declined' || item.status === 'Completed' || item.status === 'Cancelled') && (
                            <span className='text-gray-500 dark:text-gray-400 font-medium'>No action</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className='py-8 text-center text-gray-500 dark:text-gray-400'>
                      No appointments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorAppointments
