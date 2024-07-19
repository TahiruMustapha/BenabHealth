import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import toast from "react-hot-toast";
// import { useParams } from "react-router-dom";
const fetchDoctorById = async (id) => {
  try {
    const response = await axios.get(`/api/user/doctors-home/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching doctor:", error);
    throw error;
  }
};
const DoctorHome = () => {
  const id = "669662f897db02aae1ea9f6f";

  

  const [doctor, setDoctor] = useState(null);
  useEffect(() => {
    const getDoctor = async () => {
      try {
        const doctorData = await fetchDoctorById(id);
        setDoctor(doctorData);
      } catch (error) {
        console.log("Error fetching doctor", error);
      }
    };

    getDoctor();
  }, [id]);

  return (
    <Layout>
      {doctor && (
        <div className="w-[30%] rounded-md shadow-md border-gray-300 border-[1px] px-2 py-3 ">
          <p className=" uppercase border-b-gray-400 border-b-[1px]">
            Dr. {doctor.firstName} {doctor.lastName}
          </p>
          <div className=" mt-1">
            <p>Phone number: {doctor.phoneNumber}</p>
            <p>Address: {doctor.address}</p>
            <p>Fee per visit: ${doctor.feePerConsultation}</p>
            {/* <p>Timings: {convertedTimings}</p> */}
          </div>
          Hello
        </div>
      )}
    </Layout>
  );
};

export default DoctorHome;
