import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { GoDatabase } from "react-icons/go";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";

const Appointments = () => {
  // const { user } = useSelector((state) => state.user);
  const [userData, setUserData] = useState([]);
  const [userDataAp, setUserDataAp] = useState([]);
  const userInfo = localStorage.getItem("user");
  const userIn = userInfo ? JSON.parse(userInfo) : null;
  const [appointment, setAppointment] = useState([]);
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `/api/user/appointments/${userIn?._id}`
        );
        setAppointment(response.data);
      } catch (error) {
        console.log("Error fetching appointments!", error);
      }
    };
    fetchAppointments();
  }, [userIn?._id]);
  console.log(appointment);
  const date = moment(appointment?.date).format("MM/DD/YYYY");
  const time = moment(appointment?.date).format("h:mm:ss a");
  console.log(appointment);
  return (
    <Layout>
      <div>
        <h1 className=" text-xl text-gray-500 font-semibold pb-2 mt-2 px-2">
          Appointments
        </h1>
        <hr className=" " />
      </div>
      <table className=" w-full mt-4 text-left rtl:text-right ">
        <thead className=" bg-gray-100 text-sm text-gray-600 uppercase ">
          <tr className=" ">
            <th scope="col" className="px-6 py-3">
              id
            </th>
            <th scope="col" className="px-6 py-3">
              Doctor
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
        {appointment.length >= 0 ? (
          <tbody>
            {appointment.map((userAppointment) => (
              <tr key={userAppointment._id}>
                <td className=" px-6 py-4">{userAppointment._id}</td>
                <td className=" px-6 py-4">
                  {userAppointment.doctor?.firstName}{" "}
                  {userAppointment.doctor?.lastName}
                </td>
                <td className=" px-6 py-4">
                  {userAppointment.doctor?.phoneNumber}
                </td>
                <td className=" px-6 py-4">
                  {/* {date} | {time} */}
                  {moment(userAppointment?.date).format("MM/DD/YYYY")}
                  {moment(userAppointment?.time).format("MM/DD/YYYY")}
                </td>
                <td className=" px-6 py-4">{userAppointment.status}</td>
              </tr>
            ))}
          </tbody>
        ) : (
          <div className=" w-full flex flex-col items-center mt-10 justify-center">
            <GoDatabase className=" text-3xl text-gray-400" />
            <p className=" text-gray-400 text-sm">No Appointment</p>
          </div>
        )}
      </table>
    </Layout>
  );
};

export default Appointments;

//  When a user makes an appointment, user will be redirected
//  to users appointment page where user can see his appointmentId,
//   the doctor who was been booked (name, phone),
//    date and time the appointment was made
