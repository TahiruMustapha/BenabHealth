import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { FaUserDoctor } from "react-icons/fa6";
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("/api/user/get-user-info")
      .then((user) => setUsers(user.data))
      .catch((err) => console.log(err));
  }, []);
  console.log(users);
  return (
    <Layout>
      <div>
        <h1 className=" text-xl text-gray-500 font-semibold pb-2 mt-2 px-2">
          Users
        </h1>
        <hr className=" " />
      </div>
      <table className=" w-full mt-4 text-left rtl:text-right ">
        <thead className=" bg-gray-100 text-sm text-gray-600 uppercase ">
          <tr className=" ">
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Created At
            </th>
          </tr>
        </thead>
        {users.length >= 1 ? (
          <tbody>
            {users.map((user, index) => {
              const { createdAt } = user;
              const dateObj = new Date(createdAt);
              const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
              };
              const formattedDate = new Intl.DateTimeFormat(
                "en-US",
                options
              ).format(dateObj);
              return (
                <tr key={user._id} className="border-b dark:border-gray-700">
                  <td className=" px-6 py-4">{user.name}</td>
                  <td className=" px-6 py-4">{user.email}</td>
                  <td className=" px-6 py-4">
                    {(user.isAdmin && "Admin") ||
                      (user.isDoctor && "Doctor") ||
                      (!user?.isAdmin && !user?.isDoctor && "User")}
                  </td>

                  <td className=" px-6 py-4">{formattedDate}</td>
                </tr>
              );
            })}
          </tbody>
        ) : (
          <div className=" w-full flex flex-col items-center mt-10 justify-center">
            <FaUserDoctor className=" text-3xl text-gray-400" />
            <p className=" text-gray-400 text-sm">No Doctor</p>
          </div>
        )}
      </table>
    </Layout>
  );
};

export default AdminUsers;
