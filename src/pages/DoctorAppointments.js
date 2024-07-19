import React from 'react'
import Layout from '../components/Layout'
import { GoDatabase } from 'react-icons/go'

const DoctorAppointments = () => {
  return (
    <Layout>
      <div>
        <h1 className=" text-xl text-gray-500 font-semibold pb-2 mt-2 px-2">
          Appointments
        </h1>
        <hr className=" " />
      </div>
      <table className=" w-full mt-4">
        <thead className=" bg-gray-100 text-sm text-gray-600 uppercase ">
          <tr className=" ">
            <th scope="col" className="px-6 py-3">
              id
            </th>
            <th scope="col" className="px-6 py-3">
              Patient
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              Date & Time
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
      </table>
      <div className=" w-full flex flex-col items-center mt-10 justify-center">
        <GoDatabase className=" text-3xl text-gray-400" />
        <p className=" text-gray-400 text-sm">No Data</p>
      </div>
    </Layout>
  )
}

export default DoctorAppointments
