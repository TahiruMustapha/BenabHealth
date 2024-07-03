import React from "react";
import { FaAsterisk } from "react-icons/fa";
const Login = () => {
  return (
    <div className=" bg-[#053B50] w-full h-full   authentication">
      <div className=" bg-white  relative  shadow-md border-gray-300 border-[1px] rounded-md  w-[30%] px-3 py-5 authentication-form card">
        <form className=" w-full h-full mt-7">
          <div className="  bg-[#F86F03]  absolute top-3 left-[-20px]   px-3 py-1 rounded-bl-xl">
            <h1 className=" text-2xl ml-4     inline-block   text-white card-title capitalize">
              Welcome back
            </h1>
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
              id="password"
              className=" outline-none focus:outline-none focus:border-none border-gray-300 rounded-sm"
            />
          </div>
          <button className=" mt-3 py-2 bg-[#053B50] w-full text-white">
            Login
          </button>
          <div className=" mt-2">
            <span>Don't have an account?</span>
            <a href="/register" className=" text-blue-700">
              {" "}
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
