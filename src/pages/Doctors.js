import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import { FaUserDoctor } from "react-icons/fa6";
import axios from "axios";
import { HiDotsVertical } from "react-icons/hi";
import ActionBtns from "../components/ActionBtns";

const Doctors = () => {
  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/user/get-doctor-info`);
      setDoctors(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [doctors, setDoctors] = useState([]);
  const [openActionId, setOpenActionId] = useState(null); // Track the ID of the open action menu
  const actionRefs = useRef({});

  useEffect(() => {
    fetchDoctors();
   
  }, []);

  useEffect(() => {
    const handler = (e) => {
      Object.values(actionRefs.current).forEach((ref) => {
        if (ref && !ref.contains(e.target)) {
          setOpenActionId(null); 
        }
      });
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const showActions = (id) => {
    setOpenActionId((prevId) => (prevId === id ? null : id)); 
  };

  return (
    <Layout>
      <div>
        <h1 className="text-xl text-gray-500 font-semibold pb-2 mt-2 px-2">
          Doctors List
        </h1>
        <hr />
      </div>
      <div className="relative">
        <table className="w-full mt-4 text-left rtl:text-right">
          <thead className="bg-gray-100 text-sm text-gray-600 uppercase">
            <tr>
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
              <th scope="col" className=" px-6 w-[10px] py-3">
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
                    <td className="px-6 py-4">
                      {doctor.firstName} {doctor.lastName}
                    </td>
                    <td className="px-6 py-4">{doctor.phoneNumber}</td>
                    <td className="px-6 py-4">{formattedDate}</td>
                    <td className="px-6 py-4">{doctor.status}</td>
                    <td className="cursor-pointer px-6 py-4 relative">
                      <HiDotsVertical
                        onClick={() => showActions(doctor._id)}
                        className="text-gray-500 bg-gray-100 w-6 h-6 rounded-full py-1 ml-7  cursor-pointer text-xl"
                      />
                      {openActionId === doctor._id && (
                        <ActionBtns
                          deleteType={"doctor"}
                          approveType={"applyDoctor"}
                          approveText={"Approve"}
                          deleteText={"Delete"}
                          fetchDoctors = {fetchDoctors}
                          actionRef={(ref) =>
                            (actionRefs.current[doctor._id] = ref)
                          }
                          doctorId={doctor._id}
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <div className="w-full flex flex-col items-center mt-10 justify-center">
              <FaUserDoctor className="text-3xl text-gray-400" />
              <p className="text-gray-400 text-sm">No Doctor</p>
            </div>
          )}
        </table>
      </div>
    </Layout>
  );
};

export default Doctors;
