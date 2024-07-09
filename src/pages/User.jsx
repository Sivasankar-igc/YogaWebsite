import React, { useEffect } from "react";
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import { useSelector } from 'react-redux';
import { statusCode } from '../utils/statusFile.mjs';
import { Navigate, useNavigate } from 'react-router-dom';

const User = ({ userType }) => {
  return (
    <div>
      <Navbar userType={userType} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default User;
