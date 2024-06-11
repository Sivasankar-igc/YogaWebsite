import React from "react";
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const User = ({userType}) => {
  return (
    <div>
      <Navbar userType={userType}/>
      <Outlet/>
      <Footer />
    </div>
  );
};

export default User;
