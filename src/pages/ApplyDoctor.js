import React from "react";
import Layout from "../components/Layout";
import { Col, Form, Input, Button, Row, TimePicker } from "antd";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/alertSlice";
import { useNavigate } from "react-router-dom";

function ApplyDoctor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/user/apply-doctor-account`,
        {
          ...values,
          userid: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/user-dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Error registering user!");
    }
  };
  return (
    <Layout>
      <h1 className=" text-center md:text-left page-title font-semibold">Apply Doctor Account</h1>
      <hr />
      <Form layout="vertical" onFinish={onFinish}>
        <h1 className=" text-gray-500 mt-2 font-semibold    ">
          Personal Infomation
        </h1>
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="First Name"
              name={"firstName"}
              rules={[{ required: true }]}
            >
              <Input className="input" placeholder="First Name" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Last Name"
              name={"lastName"}
              rules={[{ required: true }]}
            >
              <Input className="input" placeholder="Last Name" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Phone Number"
              name={"phoneNumber"}
              rules={[{ required: true }]}
            >
              <Input className="input" placeholder="Phone Number" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Website"
              name={"website"}
              rules={[{ required: true }]}
            >
              <Input className="input" placeholder="Website" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Address"
              name={"address"}
              rules={[{ required: true }]}
            >
              <Input className="input" placeholder="Address" />
            </Form.Item>
          </Col>
        </Row>
        <h1 className=" text-gray-500 mt-2  font-semibold text-xl ">
          Professional Infomation
        </h1>
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Specialization"
              name={"specialization"}
              rules={[{ required: true }]}
            >
              <Input className="input" placeholder="Specialization" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Experience"
              name={"experience"}
              rules={[{ required: true }]}
            >
              <Input className="input" placeholder="Experience" type="number" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Fee Per Consultation"
              name={"feePerConsultation"}
              rules={[{ required: true }]}
            >
              <Input
                className="input"
                placeholder="Fee Per Consultation"
                type="number"
              />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Timings"
              name={"timings"}
              rules={[{ required: true }]}
            >
              <TimePicker.RangePicker className=" outline-none" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Address"
              name={"address"}
              rules={[{ required: true }]}
            >
              <Input className="input" placeholder="Address" />
            </Form.Item>
          </Col>
        </Row>

        <div className=" flex mb-6  items-center justify-end w-full  ">
          <Button
            htmlType="submit"
            className=" mb-6 text-white  hover:text-white  primary-btn"
          >
            SUBMIT
          </Button>
        </div>
      </Form>
    </Layout>
  );
}

export default ApplyDoctor;
