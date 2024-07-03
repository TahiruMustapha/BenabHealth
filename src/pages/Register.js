import React from "react";
import { FaAsterisk } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Register = () => {
  const onFinish = async (values) => {
    try {
      const response = axios.post("/api/user/register", values);
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error registering user!");
    }
  };
  return (
    <div className=" bg-[#053B50] w-full h-full   authentication">
      <div className=" bg-white  relative  shadow-md border-gray-300 border-[1px] rounded-md  w-[30%] px-3 py-5 authentication-form card">
        <form onSubmit={onFinish} className=" w-full h-full mt-7">
          <div className="  bg-[#F86F03]  absolute top-3 left-[-20px]   px-3 py-1 rounded-bl-xl">
            <h1 className=" text-2xl ml-4     inline-block   text-white card-title capitalize">
              Nice to meet you
            </h1>
          </div>

          <div className=" flex flex-col">
            <label
              htmlFor="name"
              className=" flex items-center gap-1 text-gray-400 mt-2 mb-1"
            >
              <span className=" text-[0.50rem] text-red-500">
                <FaAsterisk />
              </span>
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="  focus:outline-none focus:border-none border-gray-300 rounded-sm"
            />
          </div>
          <div className=" flex flex-col">
            <label
              htmlFor="email"
              className=" flex items-center gap-1 text-gray-400 mt-2 mb-1"
            >
              <span className=" text-[0.50rem] text-red-500">
                <FaAsterisk />
              </span>
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className=" outline-none focus:outline-none focus:border-none border-gray-300 rounded-sm"
            />
          </div>
          <div className="  flex flex-col">
            <label
              htmlFor="password"
              className=" flex items-center gap-1 text-gray-400 mt-2 mb-1"
            >
              <span className=" text-[0.50rem] text-red-500">
                <FaAsterisk />
              </span>
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className=" outline-none focus:outline-none focus:border-none border-gray-300 rounded-sm"
            />
          </div>
          <button type="submit" className=" mt-3 py-2 bg-[#053B50] w-full text-white">
            Register
          </button>
          <div className=" mt-2">
            <span>Already have an account?</span>
            <Link to="/login" className=" text-blue-700">
              {" "}
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
