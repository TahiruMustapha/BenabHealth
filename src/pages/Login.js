import React from "react";
// import { FaAsterisk } from "react-icons/fa";
import { Link, useNavigate, redirect } from "react-router-dom";
import { Form, Input, Button } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import { hideLoading, showLoading } from "../redux/alertSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("api/user/login", values);
      dispatch(hideLoading());
      const { user } = response.data;
      // console.log(user);

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        localStorage.setItem("user", JSON.stringify(user));
       
        setTimeout(() => {
          if (user?.isDoctor) {
            navigate(`/doctor-home`);
          } else if (user?.isAdmin) {
            navigate(`/admin-dashboard`);
          } else if (!user?.isAdmin && !user?.isDoctor) {
            navigate(`/user-dashboard`);
          }
        }, 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Invalid credentials!");
    }
  };
  const userDashboard = () => {
    navigate("/user-dashboard");
  };
  return (
    <div className=" bg-[#053B50] w-full h-full   authentication">
      <div className=" bg-white    shadow-md border-gray-300 border-[1px] rounded-md  w-[30%] px-3 py-5 authentication-form card">
        <h1 className=" ml-[-40px] bg-[#F86F03] px-3 py-1 rounded-bl-xl text-2xl     inline-block   text-white card-title capitalize">
          Welcome Back
        </h1>

        <Form
          layout="vertical"
          onFinish={onFinish}
          className=" w-full h-full mt-7"
        >
          <Form.Item rules={[{ required: true }]} label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            label="Password"
            name="password"
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>

          <Button
            htmlType="submit"
            className=" primary-btn mt-3  bg-[#053B50] w-full text-white"
          >
            Login
          </Button>

          <div className=" mt-2">
            <span>Don't have an account?</span>
            <Link to="/register" className=" text-blue-700 hover:underline">
              {" "}
              Register
            </Link>
            <button onClick={userDashboard}>Dashboard</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
