import axios from "axios";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";
const ComfirmDeleteUser = ({
  fetchUsers,
  userId,
  setOpenDeleteDialog,
  openDeleteDialog,
  deleteType,
  doctorId,
  fetchDoctors,
}) => {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current === e.target) setOpenDeleteDialog(!openDeleteDialog);
  };
  const handlDeleteUser = async (id) => {
    try {
      dispatch(showLoading());
      const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/user/delete-user/${id}`);
      if (!response) {
        toast.error("Unable to delete user!");
      }
      dispatch(hideLoading());
      toast.success("User deleted successfully!");
      fetchUsers();
    } catch (error) {
      console.error("Error error deleting user:", error);
    }
  };
  const handlDeleteDoctor = async (id) => {
    try {
      dispatch(showLoading());
      const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/user/delete-doctor/${id}`);
      if (!response) {
        toast.error("Unable to delete doctor!");
      }
      dispatch(hideLoading());
      toast.success("Doctor deleted successfully!");
      fetchDoctors();
    } catch (error) {
      console.error("Error error deleting doctor:", error);
    }
  };
  const handleDeleteDoctorAndUser = () => {
    if (deleteType === "doctor") {
      handlDeleteDoctor(doctorId);
    } else if (deleteType === "user") {
      handlDeleteUser(userId);
    }
  };
  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className=" flex items-center justify-center  fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
    >
      <div className=" relative flex flex-col w-[31%]  items-center justify-center rounded-md bg-white shadow-md border-gray-100 border-[1px] px-4 py-4">
        <h2 className=" mt-4 text-xl font-semibold">
          Are you sure you want to delete this user?
        </h2>
        <p className=" mt-3 font-semibold">This action cannot be undone.</p>
        <div className=" flex items-center gap-5 mt-5">
          <button
            onClick={() => {
              setOpenDeleteDialog(!openDeleteDialog);
            }}
            className=" text-red-600 font-semibold px-2 py-1"
          >
            Cancel
          </button>

          <button
            onClick={handleDeleteDoctorAndUser}
            className=" bg-[#00712D] rounded-md px-3 py-2 text-white  font-semibold"
          >
            Comfirm
          </button>
        </div>
        <IoClose
          onClick={() => setOpenDeleteDialog(!openDeleteDialog)}
          className=" text-xl  hover:text-[#E4003A]   absolute top-2 right-2"
        />
      </div>
    </div>
  );
};

export default ComfirmDeleteUser;
