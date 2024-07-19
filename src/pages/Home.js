import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
const Home = () => {
  const [approvedDoctors, setApprovedDoctors] = useState([]);
  useEffect(() => {
    const fetchApprovedDoctors = async () => {
      try {
        const response = await axios.get("/api/user/approved-doctors");
        setApprovedDoctors(response.data);
      } catch (error) {
        console.log("Error fetching approved doctors!", error);
      }
    };
    fetchApprovedDoctors();
  }, []);
  return (
    <Layout>
      <div className=" w-full">
        <h2 className=" text-center pb-2  text-xl text-gray-600">
          Approved Doctors
        </h2>
        <hr />
        <div className=" mt-4 w-full flex gap-3 flex-wrap">
          {approvedDoctors.map((approvedDoctor) => {
            const { timings } = approvedDoctor;
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

            const convertedTimings = timings.map(convertTo12HourTime);
            return (
              <div
                className="w-[30%] rounded-md shadow-md border-gray-300 border-[1px] px-2 py-3 "
                key={approvedDoctor._id}
              >
                <p className=" uppercase border-b-gray-400 border-b-[1px]">
                  Dr. {approvedDoctor.firstName} {approvedDoctor.lastName}
                </p>
                <div className=" mt-1">
                  <p>Phone number: {approvedDoctor.phoneNumber}</p>
                  <p>Address: {approvedDoctor.address}</p>
                  <p>Fee per visit: ${approvedDoctor.feePerConsultation}</p>
                  <p>Timings: {convertedTimings}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
