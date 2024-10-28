import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Form, Input, Button, Row, Col } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/alertSlice";
import toast from "react-hot-toast";

const fetchUserData = async (id) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/user/get-user/${id}`);

    return response.data;
  } catch (error) {
    console.log("Cannot get user data!", error);
  }
};
const UserProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUsers] = useState([]);
    const userInfo = localStorage.getItem("user");
    const userIn = userInfo ? JSON.parse(userInfo) : null;
    const [form] = Form.useForm();
    useEffect(() => {
      const getDoctorUserData = async () => {
        try {
          const doctorData = await fetchUserData(userIn?._id);
          setUsers(doctorData);
        } catch (error) {
          console.log("Error fetching doctor", error);
        }
      };
  
      getDoctorUserData();
    }, []);
    const { users, doctor } = user;
    //   console.log(users)
    const onFinish = async (values) => {
      dispatch(showLoading());
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_API_BASE_URL}/api/user/user-profile/${userIn?._id}`,
          values
        );
        dispatch(hideLoading());
        toast.success("User Profile updated successfully");
        setUsers(response.data);
        //   navigate("/doctor-home");
      } catch (error) {
        dispatch(hideLoading());
        console.error("Failed to update profile");
      }
    };
    form.setFieldsValue(users);
  return (
    <Layout>
      <h1 className=" text-gray-500 mt-2 font-semibold    ">
        User Infomation
      </h1>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        //   onFinish={onFinish}
        className=" w-[50%] flex  flex-col mx-auto  justify-center h-[fit] mt-7"
      >
        <Row gutter={30}>
          <Col span={8} xs={24} sm={24} lg={12}>
            <Form.Item rules={[{ required: true }]} label="Name" name="name">
              <Input placeholder="Name" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={12}>
            <Form.Item rules={[{ required: true }]} label="Email" name="email">
              <Input placeholder="Email" />
            </Form.Item>
          </Col>
        </Row>

        <Button
          htmlType="submit"
          className=" primary-btn mt-3  bg-[#053B50] w-full text-white"
        >
          Update
        </Button>
      </Form>
    </Layout>
  );
};

export default UserProfile;
