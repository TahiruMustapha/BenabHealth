import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { GoDatabase } from "react-icons/go";
import axios from "axios";

const DoctorAppointments = () => {
  const [appointment, setAppointment] = useState([]);
  const [doctorUserData, setDoctorUserData] = useState({});
  const userInfo = localStorage.getItem("user");
  const userIn = userInfo ? JSON.parse(userInfo) : null;
  useEffect(() => {
    const fetchDoctorAndUser = async () => {
      try {
        const response = axios.get(`/api/user/get-user/${userIn?._id}`);
        setDoctorUserData(await response.data);
      } catch (error) {
        console.log("Error fetching doctor user data!", error);
      }
    };
    fetchDoctorAndUser();
  }, [userIn?._id]);
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
