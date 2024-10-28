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
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/user/get-user/${id}`);
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
        `${process.env.REACT_APP_API_BASE_URL}/api/user/mark-all-notifications-as-seen`,
        { userId: user._id },
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
  
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Invalid credentials!");
    }
  };

  const deleteAll = async () => {
    try {
      dispatch(showLoading());
      // , doctorId: doctor._id
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/user/delete-all-notifications`,
        { userId: user._id },
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
        if (user?.isDoctor) {
          navigate(`/doctor-home`);
        } else if (user?.isAdmin) {
          navigate(`/admin-dashboard`);
        } else if (!user?.isAdmin && !user?.isDoctor) {
          navigate(`/user-dashboard`);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Invalid credentials!");
    }
  };

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
            {user?.unseenNotifications.map((notification) => (
              <div
                key={notification?.data.userId}
                className=" border-gray-300 border-[1px] mt-2 cursor-pointer card p-2"
                onClick={() => navigate(notification.onClickPath)}
              >
                <div className=" card-text">{notification.message}</div>
              </div>
            ))}
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
            {user?.seenNotifications.map((notification) => (
              <div
                key={notification?.data.userId}
                className=" border-gray-300 border-[1px] mt-2 cursor-pointer card p-2"
                onClick={() => navigate(notification.onClickPath)}
              >
                <div className=" card-text">{notification.message}</div>
              </div>
            ))}
          </Tabs.TabPane>
        </Tabs>
      </Layout>
    </div>
  );
};

export default Notification;
