import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { reloadUserData, setUser } from "../redux/userSlice";
import { hideLoading, showLoading } from "../redux/alertSlice";
import { setDoctor } from "../redux/doctorSlice";
const ProtectedRoutes = (props) => {
  const { user } = useSelector((state) => state.user);
  const { doctor } = useSelector((state) => state.doctor);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/get-user-info-by-id",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        dispatch(setUser(response.data.data));
        // dispatch(reloadUserData(false))
      } else {
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.clear();
      navigate("/login");
    }
  };
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  // const getDoctor = async () => {
  //   try {
  //     dispatch(showLoading());
  //     const response = await axios.post(
  //       "/api/user/get-doctor-info-by-id",
  //       { token: localStorage.getItem("token") },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     dispatch(hideLoading());
  //     if (response.data.success) {
  //       dispatch(setDoctor(response.data.data));
  //       // dispatch(reloadUserData(false))
  //     } else {
  //       localStorage.clear();
  //       navigate("/login");
  //     }
  //   } catch (error) {
  //     dispatch(hideLoading());
  //     localStorage.clear();
  //     navigate("/login");
  //   }
  // };
  // useEffect(() => {
  //   if (!doctor) {
  //     getDoctor();
  //   }
  // }, [doctor]);
  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default ProtectedRoutes;
