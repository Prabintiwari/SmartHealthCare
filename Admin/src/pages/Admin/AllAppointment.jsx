import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faFilter, faTimes } from '@fortawesome/free-solid-svg-icons'

const AllAppointment = () => {
  const { appointments, getAllAppointments, aToken, cancelAppointment } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  const calculateAge = (dob) => {
    const today = new Date()
    const birthDate = new Date(dob)
    let age = today.getFullYear() - birthDate.getFullYear()
    return age
  }

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <div className='bg-white dark:bg-slate-800 rounded-lg shadow-md'>
        <div className='p-5 border-b dark:border-gray-700 flex justify-between items-center'>
          <h2 className='text-2xl font-semibold text-gray-800 dark:text-white'>All Appointments</h2>
          <div className='flex items-center gap-3'>
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
                  <th className='text-left py-4 px-3 text-gray-700 dark:text-gray-300 font-semibold'>Doctor</th>
                  <th className='text-left py-4 px-3 text-gray-700 dark:text-gray-300 font-semibold'>Speciality</th>
                  <th className='text-left py-4 px-3 text-gray-700 dark:text-gray-300 font-semibold'>Date & Time</th>
                  <th className='text-left py-4 px-3 text-gray-700 dark:text-gray-300 font-semibold'>Fees</th>
                  <th className='text-left py-4 px-3 text-gray-700 dark:text-gray-300 font-semibold'>Status</th>
                  <th className='text-left py-4 px-3 text-gray-700 dark:text-gray-300 font-semibold'>Payment</th>
                  <th className='text-left py-4 px-3 text-gray-700 dark:text-gray-300 font-semibold'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments && appointments.length > 0 ? (
                  appointments.map((item, index) => {
                    const patient = item.userId || item.userData;
                    const doctor = item.docId || item.docData;
                    
                    return (
                    <tr key={index} className='border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors'>
                      <td className='py-4 px-3 text-gray-800 dark:text-white font-medium'>{index + 1}</td>
                      <td className='py-4 px-3'>
                        <div className='flex items-center gap-3'>
                          <img src={patient?.image} alt="" className='w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600' />
                          <div>
                            <p className='font-semibold text-gray-800 dark:text-white'>{patient?.name}</p>
                            <p className='text-sm text-gray-500 dark:text-gray-400'>{patient?.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className='py-4 px-3 text-gray-800 dark:text-white'>
                        {patient?.dob ? calculateAge(patient.dob) : 'N/A'}
                      </td>
                      <td className='py-4 px-3'>
                        <div className='flex items-center gap-3'>
                          <img src={doctor?.image} alt="" className='w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600' />
                          <p className='font-semibold text-gray-800 dark:text-white'>{doctor?.name}</p>
                        </div>
                      </td>
                      <td className='py-4 px-3'>
                        <span className='bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-xs font-medium'>
                          {doctor?.speciality}
                        </span>
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
                        {!item.cancelled && item.status !== 'Cancelled' ? (
                          <button 
                            onClick={() => cancelAppointment(item._id)}
                            className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2'
                          >
                            <FontAwesomeIcon icon={faTimes} />
                            Cancel
                          </button>
                        ) : (
                          <span className='text-gray-500 dark:text-gray-400 font-medium'>Cancelled</span>
                        )}
                      </td>
                    </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="10" className='py-8 text-center text-gray-500 dark:text-gray-400'>
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

export default AllAppointment