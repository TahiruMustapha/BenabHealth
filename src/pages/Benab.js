import React from "react";
import { FaInstagram } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import med3 from "../images/med3.png"
import { Link, useNavigate } from "react-router-dom";
const Benab = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full ">
      <div className=" px-5 md:px-32 py-10">
        <div className=" flex items-center justify-between">
          <h2 className="bg-[#050C9C] w-[3rem] md:w-[6rem] h-[3rem] md:h-[6rem] rounded-full flex items-center justify-center text-white font-extrabold text-xl md:text-5xl">
            BH
          </h2>
          <div className=" hidden md:flex items-center gap-3">
            <FaInstagram className="text-2xl text-[#050C9C]" />
            <CiFacebook className="text-2xl text-[#050C9C]" />
          </div>
          <div className="flex text-[#050C9C] gap-4">
            <Link className="font-semibold" to={"/register"}>
              Register
            </Link>
            <Link className="font-semibold" to={"/login"}>
              Login
            </Link>
          </div>
        </div>
        <div className=" mt-10 md:mt-5   w-full flex gap-3 items-center ">
          <div className=" flex-1">
            <h1 className=" text-5xl md:text-5xl  font-bold tracking-wide">
              We work every <br /> day to improve <br />{" "}
              <span className="text-[#050C9C]">your quality of life.</span>{" "}
            </h1>
            <hr className="w-[60px] h-[7px] rounded-md bg-[#050C9C] mt-6" />
            <button
              onClick={() => navigate("/login")}
              className="bg-[#050C9C] px-6 py-1  text-sm tracking-wide text-white mt-16 rounded-md"
            >
              SCHEDULE A TURN
            </button>
          </div>
          {/* <div className="relative  h-[25rem]   w-[60%]">
            <img
              src={doc3}
              alt="doctor-img"
              className="rounded-br-[3rem] absolute right-[9rem] top-[-14px] z-50 rounded-md w-[170px]"
            />
            <span className="bg-[#050C9C] absolute top-[2.5rem] left-[13rem] w-6 h-6 text-[#050C9C] rounded-full flex items-center justify-center ">
              e1
            </span>
            <div className="flex gap-2 absolute right-[9rem] bottom-[6.5rem]">
              <span className="bg-[#050C9C] w-6 h-6 text-[#050C9C] rounded-full flex items-center justify-center ">
                e1
              </span>
              <span className="bg-[#050C9C] w-6 h-6 text-[#050C9C] rounded-full flex items-center justify-center ">
                e1
              </span>
            </div>
            <div className="w-[43%] h-[15rem] absolute flex items-center  justify-end rounded-tl-[4rem] rounded-br-[1rem] top-[10%] left-[30%] bg-[#050C9C]">
              <span className="text-[#050C9C] mt-14 px-[5rem] rounded-md py-[5rem] border-white border-b-[0px] border-r-[0px] border-[1px]">
                <hr className="h-[1rem] rounded-xl bg-gradient-to-r from-gray-400 to-[#050d9c] 30% " />
                vhlbjkjb ,nm
              </span>
            </div>
            <div>
              <span className="text-white absolute left-[18rem] mt-8 px-[5rem] rounded-md py-[5rem] border-white border-b-[0px] top-[12rem] border-l-[0px] border-[1px]">  
              </span>
            </div>
            <img
              src={doc2}
              alt="doctor-img"
              className="rounded-br-[3rem] absolute left-[9rem] bottom-[5rem] z-50 rounded-md w-[200px]"
            />
            <div className="absolute top-[7rem] left-[11rem] rounded-tl-[4rem] bg-gradient-to-r from-gray-300 from 30% via-transparent to-[#050d9c] w-[7rem] h-[8rem]"></div>
            <div className="absolute top-[.5rem]  left-[23rem] rounded-tl-[4rem] bg-gradient-to-b from-gray-300 from 30% via-transparent to-[#050d9c] w-[7rem] h-[5rem]"></div>
            <div className="absolute top-[8.5rem] right-[9.5rem] rounded-tr-[0] rounded-br-[4rem] bg-gradient-to-r from-[#050d9c] from 30% via-transparent to-gray-300 w-[7rem] h-[7rem]"></div>
          </div> */}  
           <img src={med3} alt="doctor-img" className=" hidden md:flex w-[50%]"   />
        </div>
      </div>
    </div>
  );
};
export default Benab;
