import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosLogOut, IoMdCheckmark } from "react-icons/io";
import { hideLoading, showLoading } from "../redux/alertSlice";
import { useDispatch } from "react-redux";

const ActionBtns = ({
  actionRef,
  doctorId,
  rejectText,
  approveText,
  deleteText,
  deleteType,
  approveType,
  userId,
  doctorAppointmentId,
}) => {
  const dispatch = useDispatch();
  const handlApproveApplyDoctorAccount = async (id) => {
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
  const handlApproveAppointments = async (id) => {
    try {
      const response = await axios.put(`/api/user/approve-appointments/${id}`);
      if (!response) {
        toast.error("Unable to approve user appointment!");
      }
      toast.success("Appointment approved successfully!");
    } catch (error) {
      console.error("Error approving appointment:", error);
    }
  };
  const handlApprove = () => {
    if (approveType === "applyDoctor") {
      handlApproveApplyDoctorAccount(doctorId);
    } else if (approveType === "appointement") {
      handlApproveAppointments(doctorAppointmentId);
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
  const handlDeleteUser = async (id) => {
    try {
      dispatch(showLoading());
      const response = await axios.delete(`/api/user/delete-user/${id}`);
      if (!response) {
        toast.error("Unable to delete user!");
      }
      dispatch(hideLoading());
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error error deleting user:", error);
    }
  };
  const handleRejectAppointment = async (id) => {
    try {
      dispatch(showLoading());
      const response = await axios.put(`/api/user/appointment/${id}/reject`);
      if (!response) {
        toast.error("Unable to reject appointment!");
      }
      dispatch(hideLoading());
      toast.success("Appointment rejected successfully!");
    } catch (error) {
      console.log("Error rejecting appointment", error);
    }
  };
  const handleDelete = () => {
    if (deleteType === "doctor") {
      handlDeleteDoctor(doctorId);
    } else if (deleteType === "user") {
      handlDeleteUser(userId);
    }
  };
  return (
    <div
      ref={actionRef}
      className="  z-50  border-gray-200 border-[1px] bg-white absolute top-[17px] right-[3.6rem] text-sm text-gray-600 font-medium shadow-md px-2 py-2 w-[8rem] rounded-md"
    >
      {approveText && (
        <p
          onClick={handlApprove}
          className=" flex items-center hover:bg-gray-200 px-1 py-1 rounded-sm justify-between"
        >
          {approveText}
          <span>
            <IoMdCheckmark className="  text-green-600" />
          </span>{" "}
        </p>
      )}

      {rejectText && (
        <p
          onClick={()=>handleRejectAppointment(doctorAppointmentId)}
          className=" flex items-center hover:bg-gray-200 px-1 py-1 rounded-sm justify-between"
        >
          {rejectText}
          <span>
            <IoIosLogOut className="  text-gray-400" />
          </span>
        </p>
      )}

      {deleteText && (
        <p
          onClick={handleDelete}
          className=" flex items-center hover:bg-gray-200 px-1 py-1 rounded-sm justify-between"
        >
          {deleteText}
          <span>
            <FaRegTrashAlt className="  text-red-300" />
          </span>
        </p>
      )}
    </div>
  );
};

export default ActionBtns;
