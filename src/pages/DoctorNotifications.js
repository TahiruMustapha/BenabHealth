import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Tabs } from "antd";
import { useDispatch} from "react-redux";
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

const DoctorNotification = () => {
  const navigate = useNavigate();
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

  const markAllDoctorNotificationAsSeen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/user/mark-all-doctor-notifications-as-seen`,
        { doctorId: doctor?._id },
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

  const deleteAllDoctorNotifications = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/user/delete-all-doctor-notifications`,
        { doctorId: doctor._id },
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
  return (
    <div>
      <Layout>
        <h1>Notifications</h1>
        <Tabs>
          <Tabs.TabPane tab="Unseen" key={0}>
            <div className=" flex justify-end">
              <h1
                onClick={() => markAllDoctorNotificationAsSeen()}
                className=" underline cursor-pointer anchor"
              >
                Mark all as seen
              </h1>
            </div>
            {doctor?.unseenNotifications.map((notification) => (
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
                onClick={() => deleteAllDoctorNotifications()}
                className=" cursor-pointer anchor"
              >
                Delete all
              </h1>
            </div>
            {doctor?.seenNotifications.map((notification) => (
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

export default DoctorNotification;
