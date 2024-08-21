import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import appointmentData from "../chartData/appointmentData.json";
import { Bar, Doughnut, Line, PolarArea } from "react-chartjs-2";
import Chart, { Legend, plugins } from "chart.js/auto";
import { GrTemplate } from "react-icons/gr";
import app1 from "../images/app1.jpg";
import app2 from "../images/app2.jpg";
import app3 from "../images/app3.jpg";
import app5 from "../images/app5.jpg";
import { IoIosStarOutline, IoMdArrowForward } from "react-icons/io";
import { FaRegHeart, FaTelegramPlane, FaUsers } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { GiSandsOfTime } from "react-icons/gi";
import { MdOutlineAttachEmail } from "react-icons/md";

const fetchUserData = async (id) => {
  try {
    const response = await axios.get(`/api/user/get-user/${id}`);
    return response.data;
  } catch (error) {
    console.log("Cannot get user data!", error);
  }
};

const fetchDoctorAppointment = async (id) => {
  try {
    const response = await axios.get(`/api/user/doctor-appointments/${id}`);
    return response.data;
  } catch (error) {
    console.log("Cannot get doctor appointments!", error);
  }
};
const DoctorHome = () => {
  const navigate = useNavigate();
  const patientReview = [
    {
      name: "Carl Oliver",
      job: "PA",
      image: app1,
      review:
        " There is now an in order to have a  ready-made  text to sing with the melody alternatives to the classic Lorem Ipsum texts are amusing.",
    },
    {
      name: "Barbara McIntosh",
      job: "M.D",
      image: app2,
      review:
        " There is now an in order to have a ready-made text to sing with the melody alternatives to the classic Lorem Ipsum texts are amusing.",
    },
    {
      name: "Christa Smith",
      job: "Manager",
      image: app3,
      review:
        " There is now an in order to have a ready-made text to sing with the melody alternatives to the classic Lorem Ipsum texts are amusing.",
    },
    {
      name: "Dean Tolle",
      job: "Developer",
      image: app5,
      review:
        " According to most sources in order to have a ready-made text to sing with the melody the origin of the text by compiling all the instances. ",
    },
    {
      name: "Wendy Filson",
      job: "Designer",
      image: app3,
      review:
        "It seems that only in order to have a ready-made text to sing with the melody Lorem Ipsum, which is said to have originated 16th century. ",
    },
  ];
  const [userData, setUserData] = useState({});
  const [appointments, setAppointment] = useState([]);
  const userInfo = localStorage.getItem("user");
  const userIn = userInfo ? JSON.parse(userInfo) : null;

  useEffect(() => {
    const getDoctorUserData = async () => {
      try {
        const doctorData = await fetchUserData(userIn?._id);
        setUserData(doctorData);
      } catch (error) {
        console.log("Error fetching doctor", error);
      }
    };

    getDoctorUserData();
  }, [userIn?._id]);
  const { users, doctor } = userData;
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const doctorAppointment = await fetchDoctorAppointment(doctor._id);
        setAppointment(doctorAppointment);
      } catch (error) {
        console.log("Error fetching appointments!", error);
      }
    };
    fetchAppointments();
  }, [doctor?._id]);

  const dateFormat = function (dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    const daySuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };
    return `${day}${daySuffix(day)} , ${month} ${year}`;
  };
  // console.log(users);
  const getCurrentDateTime = function () {
    const now = new Date();

    //get day of thre week
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfweek = daysOfWeek[now.getDay()];

    //Get months in days
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = months[now.getMonth()];

    //Get day of the month
    const day = now.getDay();

    //Get year
    const year = now.getFullYear();
    //Get time
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    // Determine AM or PM
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    hours = hours.toString().padStart(2, "0");

    //greetings
    let greetings;
    if (ampm === "AM" && hours < 12) {
      greetings = "Good Morning!";
    }else if(ampm === "PM" && hours < 6){
      greetings = "Good Afternoon!";
    }else if(ampm === "PM" && hours < 9){
      greetings = "Good Evening!";
    }else {
      greetings = "Good Night!";
    }
    //Format the date in words
    const formattedDate = `${dayOfweek}, ${month} ${day}, ${year}`;

    //Format the time
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return `${formattedDate} | ${formattedTime}`;
  };
  const chartData = [
    {
      label: "Monday",
      data: 40,
    },
    {
      label: "Tuesday",
      data: 30,
    },
    {
      label: "Wednesday",
      data: 41,
    },
    {
      label: "Thurday",
      data: 35,
    },
    {
      label: "Friday",
      data: 40,
    },
  ];
  return (
    <Layout>
      <h2 className=" text-2xl px-6 text-gray-500 mb-4 font-semibold">
        Dashboard
      </h2>
      <div className=" flex items-center gap-3 px-6 mb-5">
        <div className=" px-4 py-3 rounded-md border-gray-100 border-[1px] w-[50%] shadow-md">
          <div className=" flex items-center justify-between">
            <p className=" font-semibold text-3xl capitalize">Good Morning</p>
            <p className="text-gray-500 text-sm">{getCurrentDateTime()}</p>
          </div>

          <p className="text-[#053b50] font-bold">
            Dr. {doctor?.firstName} {doctor?.lastName}
          </p>
          <div className=" flex items-center gap-3 mt-2">
            <div className=" border-gray-200 border-[1px] px-3 py-1 rounded-md">
              <p className=" text-gray-500 font-semibold">
                Total Appointments Today
              </p>
              <p className=" text-center font-bold text-2xl text-[#41B06E]">
                23
              </p>
            </div>
            <div className=" border-gray-200 border-[1px] px-3 py-1 rounded-md">
              <p className=" text-gray-500 font-semibold">
                Appointments Cancelled
              </p>
              <p className=" text-center font-bold text-2xl text-[#FF0000]">
                43
              </p>
            </div>
          </div>
        </div>
        <div className=" w-[25%] px-4 py-3 rounded-md border-gray-100 border-[1px] shadow-md">
          <div className=" flex items-center justify-between">
            <p className=" text-sm  font-semibold">Weekly Reports</p>
            <p className=" text-sm text-gray-500">Last Week</p>
          </div>
          <div className="">
            <Line
              data={{
                labels: chartData.map((data) => data.label),
                datasets: [
                  {
                    label: "Approved",
                    data: chartData.map((data) => data.data),
                    fill: false,
                    backgroundColor: "#F99417",
                    borderColor: "#F99417",
                    tension: 0.1,
                  },
                ],
              }}
            />
          </div>
        </div>
        <div className="px-4 py-3 rounded-md border-gray-100 border-[1px] shadow-md w-[25%] flex items-center gap-3 ">
          <p className="text-[#053b50] font-semibold">
            You have a new <br /> message <br /> Doctor!
          </p>
          <img
            src={app1}
            className=" w-[9.5rem] h-[9.5rem] rounded-md"
            alt="doctor-Img"
          />
        </div>
      </div>
      <div className=" w-full flex items-center justify-center gap-4 mb-5">
        <div className=" w-[23%] shadow-md px-3 py-3 rounded-md">
          <div className=" w-full flex items-center justify-between">
            <h3 className=" font-medium">Appointments</h3>
            <p className=" border-gray-200 border-[1px] text-xs bg-blue-50 text-blue-700 font-semibold px-2 py-[0.10rem] rounded-2xl">
              +15%
            </p>
            <p className=" text-gray-400 font-medium">220+</p>
            <p className=" text-gray-400 font-medium">Week</p>
          </div>
          <Line
            data={{
              labels: appointmentData.map((data) => data.label),
              datasets: [
                {
                  label: "Appointment",
                  data: appointmentData.map((data) => data.revenue),
                  backgroundColor: "#064FF0",
                  borderColor: "#064FF0",
                },
              ],
            }}
          />
        </div>
        <div className=" w-[23%] shadow-md px-3 py-3 rounded-md">
          <div className=" w-full flex items-center justify-between">
            <h3 className=" font-medium">Patients</h3>
            <p className=" border-gray-200 border-[1px] text-xs bg-green-100 text-green-700 font-semibold px-2 py-[0.10rem] rounded-2xl">
              +15%
            </p>
            <p className=" text-gray-400 font-medium">220+</p>
            <p className=" text-gray-400 font-medium">Week</p>
          </div>
          <Line
            data={{
              labels: appointmentData.map((data) => data.label),
              datasets: [
                {
                  label: "Patients",
                  data: [65, 59, 80, 81, 56, 55, 40],
                  fill: false,
                  borderColor: "rgb(75, 192, 192)",
                  backgroundColor: "rgb(75, 192, 192)",
                  tension: 0.1,
                },
              ],
            }}
          />
        </div>
        <div className=" w-[23%] shadow-md px-3 py-3 rounded-md">
          <div className=" w-full flex items-center justify-between">
            <h3 className=" font-medium">Approved</h3>
            <p className=" border-gray-200 border-[1px] text-xs bg-orange-100 text-orange-700 font-semibold px-2 py-[0.10rem] rounded-2xl">
              +5%
            </p>
            <p className=" text-gray-400 font-medium">220+</p>
            <p className=" text-gray-400 font-medium">Week</p>
          </div>
          <Line
            data={{
              labels: appointmentData.map((data) => data.label),
              datasets: [
                {
                  label: "Approved",
                  data: [21, 39, 81, 18, 22, 15, 30],
                  fill: false,
                  backgroundColor: "#FF0000",
                  borderColor: "#FF0000",
                  tension: 0.1,
                },
              ],
            }}
          />
        </div>
        <div className=" w-[23%] shadow-md px-3 py-3 rounded-md">
          <div className=" w-full flex items-center justify-between">
            <h3 className=" font-medium">Canceled</h3>
            <p className=" border-gray-200 border-[1px] text-xs bg-[#00214d1e] text-[#00224D] font-semibold px-2 py-[0.10rem] rounded-2xl">
              +15%
            </p>
            <p className=" text-gray-400 font-medium">220+</p>
            <p className=" text-gray-400 font-medium">Week</p>
          </div>
          <Line
            data={{
              labels: appointmentData.map((data) => data.label),
              datasets: [
                {
                  label: "Canceled",
                  data: [34, 90, 40, 54, 73, 64, 49],
                  fill: false,
                  backgroundColor: "#00224D",
                  borderColor: "#00224D",
                  tension: 0.1,
                },
              ],
            }}
          />
        </div>
      </div>
      <div className=" w-full flex items-center px-0 justify-center  gap-3">
        <div className=" w-[31.4%] rounded-md  border-gray-200 border-[1px]">
          <div className=" flex items-center justify-between px-2 py-6">
            <h3 className=" font-semibold flex items-center gap-2 ">
              {" "}
              <GrTemplate className="text-[#064FF0] text-xl" /> Latest
              Appointment
            </h3>
            <p className=" font-semibold text-gray-400">
              {appointments.length} Appointments
            </p>
          </div>
          <hr />
          <div className=" w-full ">
            {appointments && (
              <div className=" mt-3 w-full ">
                {appointments.map((appointment) => (
                  <div
                    key={appointment._id}
                    className=" px-3 mt-2 w-full  flex items-center justify-between"
                  >
                    <div className=" flex w-full  items-center pb-2 gap-4">
                      <img
                        src={app1}
                        alt="senderImg"
                        className=" w-12 h-12 rounded-full"
                      />
                      <div className=" w-full">
                        <strong>{appointment?.user.name}</strong>
                        <div className=" flex items-center justify-between w-ful">
                          <p className=" text-gray-500 text-sm">
                            Booked for {dateFormat(appointment.date)}
                          </p>
                          <p className=" flex gap-1 text-gray-500 text-xs">
                            {/* <strong>Status:</strong>{" "} */}
                            <span
                              className={`${
                                appointment.status === "Approved"
                                  ? `  bg-green-100 text-green-700  px-1 py-[0.10rem] rounded-md`
                                  : `bg-orange-100 text-orange-700  px-1 py-[0.10rem] rounded-md`
                              }`}
                            >
                              {appointment.status}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className=" w-[31.4%] rounded-md  border-gray-200 border-[1px]">
          <div className=" flex items-center justify-between px-2 py-6">
            <h3 className=" font-semibold flex items-center gap-2 ">
              {" "}
              <GrTemplate className="text-[#064FF0] text-xl" /> Appointment
              Status
            </h3>
            <p className=" font-semibold text-gray-400">55 Patients</p>
          </div>
          <hr />
          <div>
            {appointments && (
              <div className=" mt-3">
                {appointments.map((appointment) => (
                  <div
                    key={appointment._id}
                    className=" px-3 mt-2 flex items-center justify-between"
                  >
                    <div className=" w-full flex items-center pb-2 gap-4">
                      <img
                        src={app1}
                        alt="senderImg"
                        className=" w-12 h-12 rounded-full"
                      />
                      <div className=" w-full">
                        <strong>{appointment?.user.name}</strong>
                        <div className=" flex items-center justify-between w-ful">
                          <p className=" text-gray-500 text-sm">
                            Booked for {dateFormat(appointment.date)}
                          </p>
                          <p className=" flex gap-1 text-gray-500 text-xs">
                            {/* <strong>Status:</strong>{" "} */}
                            <span
                              className={`${
                                appointment.status === "Approved"
                                  ? `  bg-green-100 text-green-700  px-1 py-[0.10rem] rounded-md`
                                  : `bg-orange-100 text-orange-700  px-1 py-[0.10rem] rounded-md`
                              }`}
                            >
                              {appointment.status}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className=" w-[31.4%]  rounded-md  border-gray-200 border-[1px]">
          <div className=" flex items-center justify-between px-2 py-6">
            <h3 className=" font-semibold flex items-center gap-2 ">
              {" "}
              <FaUsers className="text-[#064FF0] text-xl" /> Patients Review
            </h3>
          </div>
          <hr />
          <div className=" w-full">
            {patientReview && (
              <div className="">
                <Swiper
                  centeredSlides={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Autoplay, Pagination, Navigation]}
                  className=" w-[24rem]"
                >
                  {patientReview.map((appointment) => (
                    <SwiperSlide className=" flex items-center justify-center pb-3  text-center ">
                      <p className="  text-sm text-gray-400 px-2">
                        "{appointment.review}"
                      </p>

                      <div className="mt-3  mb-2 flex items-center px-2 gap-4">
                        <img
                          src={appointment.image}
                          alt="patientImg"
                          className=" w-10 h-10 rounded-full"
                        />
                        <div className="">
                          <p className=" flex items-center">
                            {" "}
                            <span>
                              <IoIosStarOutline className=" text-yellow-300" />
                            </span>{" "}
                            <span>
                              <IoIosStarOutline className=" text-yellow-300" />
                            </span>
                            <span>
                              <IoIosStarOutline className=" text-yellow-300" />
                            </span>
                            <span>
                              <IoIosStarOutline className=" text-yellow-300" />
                            </span>
                            <span>
                              <IoIosStarOutline className=" text-yellow-300" />
                            </span>
                          </p>
                          <p className="">
                            <span className=" text-sm font-semibold text-blue-700">
                              {appointment.name}
                            </span>
                            <span className=" text-sm  text-gray-500 font-semibold">
                              {appointment.job}
                            </span>
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className=" mt-8 px-6 flex items-center justify-center gap-3">
        <div className=" border-gray-200 flex items-center justify-center flex-col rounded-md px-4 py-5 border-[1px]">
          <p className=" w-14 h-14 rounded-full bg-blue-100 mb-2 flex items-center justify-center">
            <FaTelegramPlane className=" text-xl text-blue-600" />
          </p>
          <p className=" font-semibold text-base mb-2">New Messages</p>
          {users?.unseenNotifications.length >= 1 ? (
            <p className=" text-center text-gray-400">
              {users?.unseenNotifications.map((notification) => (
                <p className=" cursor-pointer">
                  <span className=" cursor-pointer">
                    {notification.message}
                  </span>
                  <span
                    onClick={() => navigate(notification.onClickPath)}
                    className=" flex items-center mt-2 justify-center cursor-pointer gap-2 text-blue-600 text-sm font-semibold"
                  >
                    Read More <IoMdArrowForward />
                  </span>
                </p>
              ))}
            </p>
          ) : (
            <p className=" text-center text-gray-400">
              {" "}
              Due to its wide spread use as filler text
            </p>
          )}
        </div>
        <div className=" border-gray-200 flex items-center flex-col rounded-md px-4 py-5 border-[1px]">
          <p className=" w-14 h-14 rounded-full bg-blue-100 mb-2 flex items-center justify-center">
            <MdOutlineAttachEmail className=" text-xl text-blue-600" />
          </p>
          <p className=" font-semibold text-base mb-2">Expired Messages</p>
          {users?.seenNotifications.length >= 1 ? (
            <p className=" text-center text-gray-400">
              {users?.seenNotifications.map((notification) => (
                <p className=" cursor-pointer">
                  <span className=" cursor-pointer">
                    {notification.message}
                  </span>
                  <span
                    onClick={() => navigate(notification.onClickPath)}
                    className=" flex items-center mt-2 justify-center cursor-pointer gap-2 text-blue-600 text-sm font-semibold"
                  >
                    Read More <IoMdArrowForward />
                  </span>
                </p>
              ))}
            </p>
          ) : (
            <p className=" text-center text-gray-400">
              Due to its wide spread use as filler text
            </p>
          )}
          {/* <p className=" flex items-center cursor-pointer gap-2 text-blue-600 text-sm font-semibold">
            Read More <IoMdArrowForward />
          </p> */}
        </div>
        <div className=" border-gray-200 flex items-center flex-col rounded-md px-4 py-5 border-[1px]">
          <p className=" w-14 h-14 rounded-full bg-blue-100 mb-2 flex items-center justify-center">
            <GiSandsOfTime className=" text-xl text-blue-600" />
          </p>
          <p className=" font-semibold text-base mb-2">Package Expiry</p>
          <p className=" text-center text-gray-400">
            Due to its wide spread use as filler text
          </p>

          <p className=" flex items-center cursor-pointer gap-2 text-blue-600 text-sm font-semibold">
            Read More <IoMdArrowForward />
          </p>
        </div>
        <div className=" border-gray-200 flex items-center flex-col rounded-md px-4 py-5 border-[1px]">
          <p className=" w-14 h-14 rounded-full bg-blue-100 mb-2 flex items-center justify-center">
            <FaRegHeart className=" text-xl text-blue-600" />
          </p>
          <p className=" font-semibold text-base mb-2">Saved Items</p>
          <p className=" text-center text-gray-400">
            Due to its wide spread use as filler text
          </p>
          <p className=" flex items-center cursor-pointer gap-2 text-blue-600 text-sm font-semibold">
            Read More <IoMdArrowForward />
          </p>
        </div>
      </div>
      {/* {users && doctor && (
        <div className="w-[30%] rounded-md shadow-md border-gray-300 border-[1px] px-2 py-3 ">
          <p className=" uppercase border-b-gray-400 border-b-[1px]">
            Dr. {doctor.firstName} {doctor.lastName}
          </p>
          <div className=" mt-1">
            <p>Phone number: {doctor.phoneNumber}</p>
            <p>Address: {doctor.address}</p>
            <p>Fee per visit: ${doctor.feePerConsultation}</p>
            <p>Timings:{convertedTimings}</p>
          </div>
        </div>
      )} */}
    </Layout>
  );
};

export default DoctorHome;
