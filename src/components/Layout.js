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
import { LuMenu } from "react-icons/lu";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import axios from "axios";
function Layout({ children }) {
  const [collapse, setCollapse] = useState(false);
  const location = useLocation();
  const userMenu = [
    {
      title: "User Account",
    },
    {
      name: "Home",
      path: "/",
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
      name: "Home",
      path: "/",
      icon: <RxHome />,
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
      name: "Home",
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
  return (
    <div className="main">
      <div className="flex layout">
        <div className={`sideBar`}>
          <div className=" sideBar-header">
            <p className="sideBar_titleBox">
              <h1 className="sideBar-title">BH</h1>
            </p>
          </div>
          {user?.isDoctor && (
            <div className="menu">
              {doctorMenu.map((doctor) => {
                const isActive = location.pathname === doctor.path;
                return (
                  <div key={doctor.name}>
                    <div
                      className={`${collapse ? `colapseTrue` : ` menu-item`}  ${
                        isActive && "active-menu-item"
                      }`}
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
                      <p className=" text-x s text-white underline">
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
                  <div
                    className={`${collapse ? `colapseTrue` : ` menu-item`}  ${
                      isActive && "active-menu-item"
                    }`}
                    key={user.name}
                  >
                    <span>{user.icon}</span>

                    {!collapse && <Link to={user.path}>{user.name}</Link>}
                    {!collapse && (
                      <p className=" text-x s text-white underline">
                        {user.title}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          <div className="menu">
            <div
              className={`${collapse ? `colapseTrue` : ` menu-item`} `}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <span>
                <FiLogOut />
              </span>
              {!collapse && <Link to={"/login"}>Logout</Link>}
            </div>
          </div>

          {/* <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                // <div></div>
                <div
                  className={`${collapse ? `colapseTrue` : ` menu-item`}  ${
                    isActive && "active-menu-item"
                  }`}
                  key={menu.name}
                >
                  <span>{menu.icon}</span>

                  {!collapse && <Link to={menu.path}>{menu.name}</Link>}
                  {!collapse && (
                    <p className=" text-x s text-white underline">
                      {menu.title}
                    </p>
                  )}
                </div>
              );
            })}
            <div
              className={`${collapse ? `colapseTrue` : ` menu-item`} `}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <span>
                <FiLogOut />
              </span>
              {!collapse && <Link to={"/login"}>Logout</Link>}
            </div>
          </div> */}
        </div>
        <div className="content">
          <div className="header">
            {collapse ? (
              <span
                onClick={() => setCollapse(false)}
                className=" collapseTrue ml-[5px]"
              >
                <LuMenu className=" text-2xl text-[20px] cursor-pointer" />
              </span>
            ) : (
              <span onClick={() => setCollapse(true)} className=" ml-[5px]">
                <IoClose className=" text-2xl text-[20px] cursor-pointer" />
              </span>
            )}
            <div className="  relative px-3 flex gap-4 items-center">
              <p onClick={() => navigate("/notifications")} className="">
                <IoMdNotificationsOutline className=" text-2xl" />
                {user?.unseenNotifications.length >= 1 && (
                  <span className=" w-4 h-4  flex items-center justify-center text-white font-semibold rounded-full bg-red-600 text-xs top-[-7px] right-[4.3rem]  absolute">
                    {user?.unseenNotifications.length}
                  </span>
                )}
              </p>
              <Link to={"/profile"}>{user?.name}</Link>
            </div>
          </div>
          <div className=" px-2 py-2 body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
