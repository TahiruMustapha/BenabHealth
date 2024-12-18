import React, { useEffect, useState } from "react";
import "../layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RxHome } from "react-icons/rx";
import { FaListUl } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { LuLayoutDashboard, LuMenu } from "react-icons/lu";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logout } from "../redux/userSlice";

const fetchUserData = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/api/user/get-user/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Cannot get user data!", error);
  }
};
function Layout({ children }) {
  const [collapse, setCollapse] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(true);
  const location = useLocation();
  const userMenu = [
    {
      title: "User Account",
    },
    {
      name: "Dashboard",
      path: "/user-dashboard",
      icon: <LuLayoutDashboard />,
    },
    {
      name: "Doctors",
      path: "/approve-doctors",
      icon: <RxHome />,
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: <FaListUl />,
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: <FaUserDoctor />,
    },
    {
      name: "Profile",
      path: "/user-profile",
      icon: <CgProfile />,
    },
  ];
  const adminMenu = [
    {
      title: "Admin",
    },
    {
      name: "Dashboard",
      path: "/admin-dashboard",
      icon: <LuLayoutDashboard />,
    },
    {
      name: "Users",
      path: "/admin-users",
      icon: <FiUsers />,
    },
    {
      name: "Doctors",
      path: "/doctors",
      icon: <FaUserDoctor />,
    },
    {
      name: "Profile",
      path: "/admin-profile",
      icon: <CgProfile />,
    },
  ];
  const doctorMenu = [
    {
      title: "Doctor Account",
    },
    {
      name: "Dashboard",
      path: `/doctor-home`,
      icon: <RxHome />,
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: <FiUsers />,
    },
    {
      name: "Profile",
      path: "/doctor-profile",
      icon: <FaUserDoctor />,
    },
  ];
  const { user } = useSelector((state) => state.user);
  const isUser = !user?.isAdmin && !user?.isDoctor;
  const navigate = useNavigate();
  const [doctorUserData, setDoctorUserData] = useState({});
  const userInfo = localStorage.getItem("user");
  const userIn = userInfo ? JSON.parse(userInfo) : null;
  useEffect(() => {
    const getDoctorUserData = async () => {
      try {
        const doctorData = await fetchUserData(userIn?._id);
        setDoctorUserData(doctorData);
      } catch (error) {
        console.log("Error fetching doctor", error);
      }
    };
    getDoctorUserData();
  }, [userIn._id]);
  const { doctor } = doctorUserData;
  const dispatch = useDispatch();
  return (
    <div className=" py-[15px]  px-2 md:px-[15px]">
      <div className="flex gap-2 md:gap-0">
        <div
          className={`${
            mobileMenu && "hidden"
          } md:block  bg-[#053b50] rounded-md shadow-[0_0_0_2px_rgba(128,128,128,0.158)] md:mr-5 min-h-[98vh] py-2 md:p-2`}
        >
          <div className=" sideBar-header">
            <div className=" flex items-center justify-center">
              <h1 className="bg-white flex items-center justify-center text-[#053b50] md:p-[3px] text-[20px] md:text-[40px] text-center font-bold w-[40px] h-[40px] md:w-[70px] md:h-[70px] rounded-full">
                BH
              </h1>
            </div>
          </div>
          {user?.isDoctor && (
            <div className="menu">
              {doctorMenu.map((doctor) => {
                const isActive = location.pathname === doctor.path;
                return (
                  <div key={doctor.name}>
                    <div
                      className={`${
                        collapse ? `colapseTrue` : ` menu-item `
                      }  ${isActive && "active-menu-item"}`}
                    >
                      <span>{doctor.icon}</span>

                      {!collapse && (
                        <Link to={`${doctor.path}`}>{doctor.name}</Link>
                      )}
                      {!collapse && (
                        <p className=" text-x s text-white underline">
                          {doctor.title}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {user?.isAdmin && (
            <div className="menu">
              {adminMenu.map((admin) => {
                const isActive = location.pathname === admin.path;

                return (
                  <div
                    className={`${collapse ? `colapseTrue` : ` menu-item`}  ${
                      isActive && "active-menu-item"
                    }`}
                    key={admin.name}
                  >
                    <span>{admin.icon}</span>

                    {!collapse && <Link to={admin.path}>{admin.name}</Link>}
                    {!collapse && (
                      <p className=" text-xs text-white underline">
                        {admin.title}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          {isUser && (
            <div className="menu">
              {userMenu.map((user) => {
                const isActive = location.pathname === user.path;
                return (
                  <Link
                  to={user.path}
                    className={`${collapse ? `colapseTrue` : ` menu-item`}  ${
                      isActive && "active-menu-item"
                    }`}
                    key={user.name}
                  >
                    <span>{user.icon}</span>

                    {!collapse && <span className=" text-xs">{user.name}</span>}
                    {!collapse && (
                      <p className=" text-sm text-white underline">
                        {user.title}
                      </p>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
          <div className="menu">
            <div
              className={`${collapse ? `colapseTrue` : ` menu-item`} `}
              onClick={() => {
                localStorage.clear();
                dispatch(logout());
                navigate("/");
              }}
            >
              <span>
                <FiLogOut />
              </span>
              {!collapse && <Link to={"/"}>Logout</Link>}
            </div>
          </div>
        </div>
        <div className="content ">
          <div className="bg-white rounded-md shadow-[0_0_0_2px_rgba(128,128,128,0.158)] mb-4 h-[8vh] flex items-center justify-between">
            {collapse ? (
              <span
                onClick={() => {
                  setCollapse(false);
                  setMobileMenu(true);
                }}
                className=" collapseTrue ml-[5px]"
              >
                 {!mobileMenu  ? (
                  <IoClose  className=" text-2xl text-[20px] cursor-pointer" />
                ) : (
                  <LuMenu className="  text-2xl text-[20px] cursor-pointer" />
                )}
              </span>
            ) : (
              <span
                onClick={() => {
                  setCollapse(true);
                  setMobileMenu(false);
                }}
                className=" ml-[5px]"
              >
                {mobileMenu ? (
                  <LuMenu className=" text-2xl text-[20px] cursor-pointer" />
                ) : (
                  <IoClose className="  text-2xl text-[20px] cursor-pointer" />
                )}
              </span>
            )}
            <div className="  relative px-3 flex gap-2 items-center">
              {user && (
                <p
                  onClick={() => navigate("/notifications")}
                  className=" cursor-pointer "
                >
                  <IoMdNotificationsOutline className=" text-2xl" />
                  {user?.unseenNotifications.length >= 1 && (
                    <span className=" w-4 h-4  flex items-center justify-center text-white font-semibold rounded-full bg-red-600 text-xs top-[-1px] right-[3.6rem]  absolute">
                      {user?.unseenNotifications.length}
                    </span>
                  )}
                </p>
              )}
              <Link
                className=" w-11 h-11 bg-[#053b50] rounded-full flex items-center justify-center text-white text-base font-semibold"
                to={user?.isDoctor ? `/doctor-profile` : `/user-profile`}
              >
                {user?.isDoctor
                  ? doctor?.firstName.charAt(0) + doctor?.lastName.charAt(0)
                  : user?.name?.charAt(0) || ""}
              </Link>
            </div>
          </div>
          <div className=" px-2 py-2 body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
