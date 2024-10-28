import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosLogOut, IoMdCheckmark } from "react-icons/io";
import { hideLoading, showLoading } from "../redux/alertSlice";
import { useDispatch } from "react-redux";
import ComfirmDeleteUser from "./ComfirmDeleteUser";

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
  fetchDoctors,
  fetchUsers,
  fetchAppointments,
  setOpenActionId,
}) => {
  const dispatch = useDispatch();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handlApproveApplyDoctorAccount = async (id) => {
    try {
      dispatch(showLoading());
      const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/user/doctors/${id}/approve`);
      if (!response) {
        toast.error("Unable to approve doctor!");
      }
      dispatch(hideLoading());
      toast.success("Doctor approved successfully!");
      fetchDoctors();
    } catch (error) {
      console.error("Error approving doctor:", error);
    }
  };
  const handlApproveAppointments = async (id) => {
    try {
      dispatch(showLoading());
      const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/user/approve-appointments/${id}`);
      if (!response) {
        toast.error("Unable to approve user appointment!");
      }
      dispatch(hideLoading());
      toast.success("Appointment approved successfully!");
      fetchAppointments();
    } catch (error) {
      console.error("Error approving appointment:", error);
    }
  };
  const handlApproveDoctorAccountAndAppointment = () => {
    if (approveType === "applyDoctor") {
      handlApproveApplyDoctorAccount(doctorId);
    } else if (approveType === "appointement") {
      handlApproveAppointments(doctorAppointmentId);
    }
  };
  const handleRejectAppointment = async (id) => {
    try {
      dispatch(showLoading());
      const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/user/appointment/${id}/reject`);
      if (!response) {
        toast.error("Unable to reject appointment!");
      }
      dispatch(hideLoading());
      toast.success("Appointment rejected successfully!");
      fetchAppointments();
    } catch (error) {
      console.log("Error rejecting appointment", error);
    }
  };
  const handleDeleteDoctorAndUser = () => {
    if (deleteType === "doctor") {
      setOpenDeleteDialog(true);
    } else if (deleteType === "user") {
      setOpenDeleteDialog(true);
    }
  };
  const closeMenu = () => {
    setOpenActionId(null);
  };
  return (
    <div
      ref={actionRef}
      className="  z-50  border-gray-200 border-[1px] bg-white absolute top-[17px] right-[3.6rem] text-sm text-gray-600 font-medium shadow-md px-2 py-2 w-[8rem] rounded-md"
    >
      {approveText && (
        <p
          onClick={handlApproveDoctorAccountAndAppointment}
          className=" flex items-center hover:bg-gray-200 px-1 py-1 rounded-sm justify-between"
        >
          {approveText}
          <span>
            <IoMdCheckmark className="  text-green-600" />
          </span>{" "}
        </p>
      )}
      {openDeleteDialog && (
        <ComfirmDeleteUser
          deleteType={deleteType}
          doctorId={doctorId}
          setOpenDeleteDialog={setOpenDeleteDialog}
          openDeleteDialog={openDeleteDialog}
          userId={userId}
          handleDeleteDoctorAndUser={handleDeleteDoctorAndUser}
          fetchUsers={fetchUsers}
          fetchDoctors={fetchDoctors}
          setOpenActionId={setOpenActionId}
          closeMenu={closeMenu}
        />
      )}

      {rejectText && (
        <p
          onClick={() => handleRejectAppointment(doctorAppointmentId)}
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
          onClick={handleDeleteDoctorAndUser}
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
