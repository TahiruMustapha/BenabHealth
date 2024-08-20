import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosLogOut, IoMdCheckmark } from "react-icons/io";
import { hideLoading, showLoading } from "../redux/alertSlice";
import { useDispatch } from "react-redux";

const ActionBtns = ({ actionRef, doctorId }) => {
  const dispatch = useDispatch();
  const handlApprove = async (id) => {
    try {
      dispatch(showLoading());
      const response = await axios.put(`/api/user/doctors/${id}/approve`);
      if (!response) {
        toast.error("Unable to approve doctor!");
      }
      dispatch(hideLoading());
      toast.success("Doctor approved successfully!");
    } catch (error) {
      console.error("Error approving doctor:", error);
    }
  };
  //   /delete-doctor/:id
  const handlDeleteDoctor = async (id) => {
    try {
      dispatch(showLoading());
      const response = await axios.delete(`/api/user/delete-doctor/${id}`);
      if (!response) {
        toast.error("Unable to delete doctor!");
      }
      dispatch(hideLoading());
      toast.success("Doctor deleted successfully!");
    } catch (error) {
      console.error("Error error deleting doctor:", error);
    }
  };
  
  return (
    <div
      ref={actionRef}
      className="  z-50  border-gray-200 border-[1px] bg-white absolute top-[17px] right-[16px] text-sm text-gray-600 font-medium shadow-md px-2 py-2 w-[8rem] rounded-md"
    >
      <p
        onClick={() => handlApprove(doctorId)}
        className=" flex items-center hover:bg-gray-200 px-1 py-1 rounded-sm justify-between"
      >
        Approve
        <span>
          <IoMdCheckmark className="  text-green-600" />
        </span>{" "}
      </p>
      <p className=" flex items-center hover:bg-gray-200 px-1 py-1 rounded-sm justify-between">
        Reject
        <span>
          <IoIosLogOut className="  text-gray-400" />
        </span>
      </p>

      <p
        onClick={() => handlDeleteDoctor(doctorId)}
        className=" flex items-center hover:bg-gray-200 px-1 py-1 rounded-sm justify-between"
      >
        {" "}
        Delete
        <span>
          <FaRegTrashAlt className="  text-red-300" />
        </span>{" "}
      </p>
    </div>
  );
};

export default ActionBtns;
