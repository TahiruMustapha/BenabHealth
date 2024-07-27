import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const fetchUserData = async (id) => {
  try {
    const response = await axios.get(`/api/user/get-user/${id}`);
    return response.data;
  } catch (error) {
    console.log("Cannot get user data!", error);
  }
};
const DoctorHome = () => {
  const [userData, setUserData] = useState([]);
  const userInfo = localStorage.getItem("user");
  const userIn = userInfo ? JSON.parse(userInfo) : null;

  useEffect(() => {
    const getDoctorUserData = async () => {
      try {
        const doctorData = await fetchUserData(userIn._id);
        setUserData(doctorData);
      } catch (error) {
        console.log("Error fetching doctor", error);
      }
    };

    getDoctorUserData();
  }, []);

  const { users, doctor } = userData;
  function convertTo12HourTime(dateString) {
    const date = new Date(dateString);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;

    return `${hours}:${minutesStr} ${ampm}`;
  }

  const convertedTimings = doctor?.timings.map(convertTo12HourTime);
  return (
    <Layout>
      {users && doctor && (
        <div className="w-[30%] rounded-md shadow-md border-gray-300 border-[1px] px-2 py-3 ">
          <p className=" uppercase border-b-gray-400 border-b-[1px]">
            Dr. {doctor.firstName} {doctor.lastName}
          </p>
          <div className=" mt-1">
            <p>Phone number: {doctor.phoneNumber}</p>
            <p>Address: {doctor.address}</p>
            <p>Fee per visit: ${doctor.feePerConsultation}</p>
            <p>Timings:{convertedTimings}</p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default DoctorHome;
