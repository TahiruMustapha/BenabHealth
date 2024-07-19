import React from "react";
import Layout from "../components/Layout";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/alertSlice";
import { setUser } from "../redux/userSlice";

const Notification = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const markAllAsSeen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "api/user/mark-all-notifications-as-seen",
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
      // console.log(values);
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Invalid credentials!");
    }
  };

  const deleteAll = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "api/user/delete-all-notifications",
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
                onClick={() => markAllAsSeen()}
                className=" underline cursor-pointer anchor"
              >
                Mark all as seen
              </h1>
            </div>
            {user?.unseenNotifications.map((notification) => (
              <div key={notification._id}
                className=" border-gray-300 border-[1px] mt-2 cursor-pointer card p-2"
                onClick={() => navigate(notification.onClickPath)}
              >
                <div className=" card-text">{notification.message}</div>
              </div>
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Seen" key={1}>
            <div className=" flex justify-end">
              <h1 onClick={()=>deleteAll()} className=" cursor-pointer anchor">Delete all</h1>
            </div>
            {user?.seenNotifications.map((notification) => (
              <div
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
