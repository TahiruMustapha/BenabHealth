import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import bookNow from "../images/bookNow.jpg";
import { Button, DatePicker, Form, TimePicker } from "antd";
import toast from "react-hot-toast";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";
const BookAppoint = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [doctor, setDoctor] = useState({});
  const [available, setAvailable] = useState(false);
  const [form] = Form.useForm();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const getDoctor = async () => {
      try {
        const response = await axios.get(`/api/user/doctors-home/${id}`);

        // const doctorData = await fetchDoctorById(id);
        setDoctor(response.data);
      } catch (error) {
        console.log("Error fetching doctor", error);
      }
    };

    getDoctor();
  }, []);
  console.log(doctor);
  // console.log( typeof(doctor.timings) );
  // const timings = doctor.timings
  function formatTime(time) {
    const date = new Date(time);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strMinutes = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + strMinutes + " " + ampm;
  }
  const {
    _id,
    firstName,
    lastName,
    phoneNumber,
    address,
    specialization,
    feePerConsultation,

    userId,
    website,
    timings,
    experience,
  } = doctor;
  const doctorUserId = userId;
  const checkAvailability = async () => {
    try {
      const values = await form.validateFields();
      const { date, time } = values;
      const startDateTime = moment.utc(
        `${date.format("YYYY-MM-DD")} ${time[0].format("HH:mm:ss")}`,
        "YYYY-MM-DD HH:mm:ss"
      );
      const endDateTime = moment.utc(
        `${date.format("YYYY-MM-DD")} ${time[1].format("HH:mm:ss")}`,
        "YYYY-MM-DD HH:mm:ss"
      );
      const response = await axios.post(
        `/api/user/doctors/${_id}/check-availability`,
        {
          startTime: startDateTime,
          endTime: endDateTime,
        }
      );
      if (response.data.available) {
        toast.success("Doctor is available");
        setAvailable(true);
      } else {
        toast.error("Doctor is not available at this time!");
        setAvailable(false);
      }
    } catch (error) {
      console.log("Failed to check availability", error);
    }
  };
  const onFinish = async (values) => {
    const { date, time } = values;
    const appointmentId = user._id;
    const payload = {
      appointmentId,
      doctor: doctor._id,
      doctorUserInfo: doctorUserId,
      user: user._id,
      date,
      time,
    };
    dispatch(showLoading());
    try {
      const response = await axios.post("/api/user/appointments", payload);

      dispatch(hideLoading());
      if (!response) {
        console.log("error making an appointmnt!");
      }
      toast.success("Appointment booked successfully");
      form.resetFields();
      navigate("/appointments");
    } catch (error) {
      dispatch(hideLoading());
      console.log("Failed to book appointment", error);
    }
  };
  return (
    <Layout>
      <div className=" h-full">
        <div className=" ">
          <h2 className=" text-3xl mt-2 px-2 border-gray-300 border-[0.5px] py-2 rounded-md ">
            Dr. {firstName} {lastName}
          </h2>
          <div className=" w-full h-[30rem]   flex gap-4 mt-5  justify-center">
            <img
              className=" size-[20rem] rounded-md object-cover"
              src={bookNow}
              alt="bookNow "
            />
            <div className="   size-80">
              <p>
                <strong>Timings:</strong> {""}
                {timings &&
                  timings.map((time, index) => (
                    <span key={index}>
                      {formatTime(time)}
                      {index < timings.length - 1 ? " " : ""}
                    </span>
                  ))}
              </p>
              <p className="">
                {" "}
                <strong>Phone Number</strong>: {phoneNumber}
              </p>
              <p>
                {" "}
                <strong>Address</strong>: {address}
              </p>
              <p className=" mt-2">
                {" "}
                <strong className=" capitalize">Fee per visit</strong>: $
                {feePerConsultation}
              </p>
              <p className=" mt-2">
                {" "}
                <strong>Specialization</strong>: {specialization}
              </p>
              <p className=" mt-2">
                {" "}
                <strong>Experience</strong>: {experience} years
              </p>
              <p className=" mt-2">
                {" "}
                <strong>Website</strong>: {website}
              </p>
              <Form form={form} onFinish={onFinish}>
                <Form.Item name={"date"} rules={[{ required: true }]}>
                  <DatePicker className=" w-full mt-3" />
                </Form.Item>
                <Form.Item name={"time"} rules={[{ required: true }]}>
                  <TimePicker.RangePicker className="  w-full mt-3 outline-none" />
                </Form.Item>
                {available ? (
                  <Button
                    htmlType="submit"
                    className=" mb-6 w-full text-white  hover:text-white  primary-btn"
                  >
                    Book Now
                  </Button>
                ) : (
                  <Button
                    type="default"
                    onClick={checkAvailability}
                    className=" mb-6 w-full text-white  hover:text-white  primary-btn"
                  >
                    Check Availability
                  </Button>
                )}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookAppoint;
