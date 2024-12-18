import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { GoDatabase } from "react-icons/go";
import axios from "axios";
const Appointments = () => {
  const [appointment, setAppointment] = useState([]);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user")) || {};
    setUserData(userInfo);
  }, []);
  console.log(userData._id);
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/user/user-appointments/${userData?._id}`
        );
        setAppointment(response.data);
      } catch (error) {
        console.log("Error fetching appointments!", error);
      }
    };
    fetchAppointments();
  }, [userData?._id]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };
  const formatTime = (timeString) => {
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    return new Date(timeString).toLocaleTimeString(undefined, options);
  };
  return (
    <Layout>
      <div>
        <h1 className=" text-center md:text-left text-xl text-gray-500 font-semibold pb-2 mt-2 px-2">
          Appointments
        </h1>
        <hr className=" " />
      </div>
      <div className="w-full overflow-x-auto mt-4">
  <table className="w-full text-left rtl:text-right table-auto">
    <thead className="bg-gray-100 text-sm text-gray-600 uppercase">
      <tr>
        <th scope="col" className="px-6 py-3">ID</th>
        <th scope="col" className="px-6 py-3">Doctor</th>
        <th scope="col" className="px-6 py-3">Phone</th>
        <th scope="col" className="px-6 py-3">Date & Time</th>
        <th scope="col" className="px-6 py-3">Status</th>
      </tr>
    </thead>
    {appointment?.length >= 0 ? (
      <tbody>
        {appointment.map((userAppointment) => (
          <tr key={userAppointment._id} className="border-b">
            <td className="px-6 py-4 whitespace-nowrap">{userAppointment._id}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              {userAppointment.doctor?.firstName} {userAppointment.doctor?.lastName}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {userAppointment.doctor?.phoneNumber}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {formatDate(userAppointment.date)}{" "}
              <span>
                {userAppointment.time.map((time, index) => (
                  <span key={index}> {formatTime(time)}</span>
                ))}
              </span>
            </td>
            <td className="px-6 py-4">
              <p className="flex gap-1 text-gray-500 text-xs">
                <span
                  className={`${
                    userAppointment.status === "Approved"
                      ? `bg-green-100 text-green-700 px-1 py-[0.10rem] rounded-md`
                      : `bg-orange-100 text-orange-700 px-1 py-[0.10rem] rounded-md`
                  }`}
                >
                  {userAppointment.status}
                </span>
              </p>
            </td>
          </tr>
        ))}
      </tbody>
    ) : (
      <div className="w-full flex flex-col items-center mt-10 justify-center">
        <GoDatabase className="text-3xl text-gray-400" />
        <p className="text-gray-400 text-sm">No Appointment</p>
      </div>
    )}
  </table>
</div>

    </Layout>
  );
};

export default Appointments;

//  When a user makes an appointment, user will be redirected
//  to users appointment page where user can see his appointmentId,
//   the doctor who was been booked (name, phone),
//    date and time the appointment was made
