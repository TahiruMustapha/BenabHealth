import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { GoDatabase } from "react-icons/go";
import axios from "axios";

const fetchUserData = async (id) => {
  try {
    const response = await axios.get(`/api/user/get-user/${id}`);
    return response.data;
  } catch (error) {
    console.log("Cannot get user data!", error);
  }
};
const fetchDoctorAppointment = async (id) => {
  try {
    const response = await axios.get(`/api/user/appointments/${id}`);
    return response.data;
  } catch (error) {
    console.log("Cannot get doctor appointments!", error);
  }
};

const DoctorAppointments = () => {
  const [appointment, setAppointment] = useState([]);
  const [doctorUserData, setDoctorUserData] = useState({});
  const userInfo = localStorage.getItem("user");
  const userIn = userInfo ? JSON.parse(userInfo) : null;
  useEffect(() => {
    const getDoctorUserData = async () => {
      try {
        const doctorData = await fetchUserData(userIn._id);
        setDoctorUserData(doctorData);
      } catch (error) {
        console.log("Error fetching doctor", error);
      }
    };

    getDoctorUserData();
  }, []);
  const { users, doctor } = doctorUserData;
  // const {users,doctor} = doctorUserData
  // console.log(doctor._id)
  const doctorId = doctor?._id;
  // console.log(doctorId);
  const id = "669e5c8e095ca441a2977fbe";
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const doctorAppointment = await fetchDoctorAppointment(id);
        setAppointment(doctorAppointment);
      } catch (error) {
        console.log("Error fetching appointments!", error);
      }
    };
    fetchAppointments();
  }, []);
  console.log(appointment);
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
              Email
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
  );
};

export default DoctorAppointments;
