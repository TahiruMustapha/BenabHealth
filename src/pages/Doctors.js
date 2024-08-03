import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { FaUserDoctor } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Doctors = () => {
  const { user } = useSelector((state) => state.user);
  // console.log(user);

  const handlApprove = async (id) => {
    try {
      const response = await axios.put(`/api/user/doctors/${id}/approve`);
      if (!response) {
        toast.error("Unable to approve doctor!");
      }
      toast.success("Doctor approved successfully!");
    } catch (error) {
      console.error("Error approving doctor:", error);
    }
  };
   // const { user } = useSelector((state) => state.user);
  // console.log(user);
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    axios
      .get("/api/user/get-doctor-info")
      .then((doctors) => setDoctors(doctors.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Layout>
      <div>
        <h1 className=" text-xl text-gray-500 font-semibold pb-2 mt-2 px-2">
          Doctors List
        </h1>
        <hr className=" " />
      </div>

      <table className=" w-full mt-4 text-left rtl:text-right ">
        <thead className=" bg-gray-100 text-sm text-gray-600 uppercase ">
          <tr className=" ">
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              Created At
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        {doctors.length >= 1 ? (
          <tbody>
            {doctors.map((doctor, index) => {
              const { createdAt } = doctor;
              const dateObj = new Date(createdAt);
              const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
              };
              const formattedDate = new Intl.DateTimeFormat(
                "en-US",
                options
              ).format(dateObj);
              return (
                <tr key={index} className="border-b dark:border-gray-700">
                  <td className=" px-6 py-4">{doctor.firstName}</td>
                  <td className=" px-6 py-4">{doctor.phoneNumber}</td>
                  <td className=" px-6 py-4">{formattedDate}</td>
                  <td className=" px-6 py-4">{doctor.status}</td>
                  <td
                    onClick={() => handlApprove(doctor._id)}
                    className=" cursor-pointer underline px-6 py-4"
                  >
                    Approve
                  </td>
                </tr>
              );
            })}
          </tbody>
        ) : (
          <div className=" w-full flex flex-col items-center mt-10 justify-center">
            <FaUserDoctor className=" text-3xl text-gray-400" />
            <p className=" text-gray-400 text-sm">No Doctor</p>
          </div>
        )}
      </table>
    </Layout>
  );
};

export default Doctors;
