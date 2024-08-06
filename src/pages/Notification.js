import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/alertSlice";
import { setUser } from "../redux/userSlice";

const fetchUserData = async (id) => {
  try {
    const response = await axios.get(`/api/user/get-user/${id}`);
    return response.data;
  } catch (error) {
    console.log("Cannot get user data!", error);
  }
};

const Notification = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [doctorUserData, setDoctorUserData] = useState({});
  const userInfo = localStorage.getItem("user");
  const userIn = userInfo ? JSON.parse(userInfo) : null;
  useEffect(() => {
    const getDoctorUserData = async () => {
      try {
        const doctorData = await fetchUserData(userIn._id);
        setDoctorUserData(doctorData);
      } catch (error) {
        console.log("Error fetching doctor", error);
      }
    };

    getDoctorUserData();
  }, []);
  const { users, doctor } = doctorUserData;

  const markAllAsSeen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "api/user/mark-all-notifications-as-seen",
        { userId: user._id, doctorId: doctor._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
      // console.log(values);
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Invalid credentials!");
    }
  };
  // const markAllDoctorNotificationAsSeen = async () => {
  //   try {
  //     dispatch(showLoading());
  //     const response = await axios.post(
  //       "api/user/mark-all-doctor-notifications-as-seen",
  //       { doctorId: doctor?._id },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     dispatch(hideLoading());
  //     if (response.data.success) {
  //       toast.success(response.data.message);
  //       dispatch(setUser(response.data.data));
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //     // console.log(values);
  //   } catch (error) {
  //     dispatch(hideLoading());
  //     toast.error("Invalid credentials!");
  //   }
  // };

  const deleteAll = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "api/user/delete-all-notifications",
        { userId: user._id, doctorId: doctor._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
      // console.log(values);
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Invalid credentials!");
    }
  };
  // const deleteAllDoctorNotifications = async () => {
  //   try {
  //     dispatch(showLoading());
  //     const response = await axios.post(
  //       "api/user/delete-all-doctor-notifications",
  //       { doctorId: doctor._id },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     dispatch(hideLoading());
  //     if (response.data.success) {
  //       toast.success(response.data.message);
  //       dispatch(setUser(response.data.data));
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //     // console.log(values);
  //   } catch (error) {
  //     dispatch(hideLoading());
  //     toast.error("Invalid credentials!");
  //   }
  // };
  // const checkAccountRole = () => {
  //   if (user?.isAdmin) {
  //     markAllAsSeen();
  //   }
  //   if (doctor) {
  //     markAllDoctorNotificationAsSeen();
  //   }
  // };
  // const checkAccountRoleToDeleteNotifications = () => {
  //   if (user?.isAdmin) {
  //     deleteAll();
  //   }
  //   if (doctor) {
  //     deleteAllDoctorNotifications();
  //   }
  // };

  // console.log(doctor?.unseenNotifications);
  const unseen_notifications =
    doctor?.unseenNotifications || user?.unseenNotifications || [];
  const seen_notifications =
    doctor?.seenNotifications || user?.seenNotifications || [];
  return (
    <div>
      <Layout>
        <h1>Notifications</h1>
        <Tabs>
          <Tabs.TabPane tab="Unseen" key={0}>
            <div className=" flex justify-end">
              <h1
                onClick={() => markAllAsSeen()}
                className=" underline cursor-pointer anchor"
              >
                Mark all as seen
              </h1>
            </div>
            {unseen_notifications.map((notification) => (
              <div
                key={notification?.data.userId}
                className=" border-gray-300 border-[1px] mt-2 cursor-pointer card p-2"
                onClick={() => navigate(notification.onClickPath)}
              >
                <div className=" card-text">{notification.message}</div>
              </div>
            ))}
            {/* {doctor?.unseenNotifications.map((notification) => (
              <div
                key={notification?.data.userId}
                className=" border-gray-300 border-[1px] mt-2 cursor-pointer card p-2"
                onClick={() => navigate(notification.onClickPath)}
              >
                <div className=" card-text">{notification.message}</div>
              </div>
            ))} */}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Seen" key={1}>
            <div className=" flex justify-end">
              <h1
                onClick={() => deleteAll()}
                className=" cursor-pointer anchor"
              >
                Delete all
              </h1>
            </div>
            {seen_notifications.map((notification) => (
              <div
                key={notification?.data.userId}
                className=" border-gray-300 border-[1px] mt-2 cursor-pointer card p-2"
                onClick={() => navigate(notification.onClickPath)}
              >
                <div className=" card-text">{notification.message}</div>
              </div>
            ))}
            {/* {doctor?.seenNotifications.map((notification) => (
              <div
                key={notification?.data.userId}
                className=" border-gray-300 border-[1px] mt-2 cursor-pointer card p-2"
                onClick={() => navigate(notification.onClickPath)}
              >
                <div className=" card-text">{notification.message}</div>
              </div>
            ))} */}
          </Tabs.TabPane>
        </Tabs>
      </Layout>
    </div>
  );
};

export default Notification;
