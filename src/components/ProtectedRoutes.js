import React from "react";
import { Navigate } from "react-router-dom";

const protectedRoutes = (props) => {
  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default protectedRoutes;