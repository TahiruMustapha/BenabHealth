import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import { GoDatabase } from "react-icons/go";
import axios from "axios";
import ActionBtns from "../components/ActionBtns";
import { HiDotsVertical } from "react-icons/hi";

const fetchUserData = async (id) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/user/get-user/${id}`);
    return response.data;
  } catch (error) {
    console.log("Cannot get user data!", error);
  }
};
const fetchDoctorAppointment = async (id) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/user/doctor-appointments/${id}`);
    return response.data;
  } catch (error) {
    console.log("Cannot get doctor appointments!", error);
  }
};

const DoctorAppointments = () => {
  const [appointments, setAppointment] = useState([]);
  const [doctorUserData, setDoctorUserData] = useState({});
  const [openActionId, setOpenActionId] = useState(null); // Track the ID of the open action menu
  const actionRefs = useRef({});
  const userInfo = localStorage.getItem("user");
  const userIn = userInfo ? JSON.parse(userInfo) : null;
  useEffect(() => {
    const getDoctorUserData = async () => {
      try {
        const doctorData = await fetchUserData(userIn?._id);
        setDoctorUserData(doctorData);
      } catch (error) {
        console.log("Error fetching doctor", error);
      }
    };
    getDoctorUserData();
  }, [userIn?._id]);
  const { doctor } = doctorUserData;
  const fetchAppointments = async () => {
    try {
      const doctorAppointment = await fetchDoctorAppointment(doctor?._id);
      setAppointment(doctorAppointment);
    } catch (error) {
      console.log("Error fetching appointments!", error);
    }
  };
  fetchAppointments();
  useEffect(() => {
    fetchAppointments();
  }, []);
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
  useEffect(() => {
    const handler = (e) => {
      Object.values(actionRefs.current).forEach((ref) => {
        if (ref && !ref.contains(e.target)) {
          setOpenActionId(null); // Close the menu if clicked outside
        }
      });
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);
  const showActions = (id) => {
    setOpenActionId((prevId) => (prevId === id ? null : id)); // Toggle the menu for the clicked row
  };
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
              Patient
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Date & Time
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        {appointments?.length >= 1 ? (
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td className=" px-6 py-4">{appointment._id}</td>
                <td className=" px-6 py-4">{appointment?.user.name}</td>
                <td className=" px-6 py-4">{appointment?.user.email}</td>
                <td className=" px-6 py-4 ">
                  {formatDate(appointment.date)}
                  <span className="">
                    {appointment.time.map((time, index) => (
                      <span className="" key={index}>
                        {" "}
                        {formatTime(time)}
                      </span>
                    ))}
                  </span>
                </td>
                <td className=" px-6 py-4">{appointment.status}</td>
                {/* <td
                  onClick={() => handlApprove(appointment._id)}
                  className=" underline cursor-pointer px-6 py-4"
                >
                  Approve
                </td> */}
                <td className="cursor-pointer px-6 py-4 relative">
                  <HiDotsVertical
                    onClick={() => showActions(appointment._id)}
                    className="text-gray-400 ml-7  cursor-pointer text-xl"
                  />
                  {openActionId === appointment._id && (
                    <ActionBtns
                      approveType={"appointement"}
                      rejectText={"Reject"}
                      approveText={"Approve"}
                      fetchAppointments={fetchAppointments}
                      actionRef={(ref) =>
                        (actionRefs.current[appointment._id] = ref)
                      }
                      doctorAppointmentId={appointment._id}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <div className=" w-full   flex flex-col items-center mt-10 justify-center">
            <GoDatabase className=" text-3xl text-gray-400" />
            <p className=" text-gray-400 text-sm">No Doctor appointments</p>
          </div>
        )}
      </table>
    </Layout>
  );
};

export default DoctorAppointments;
