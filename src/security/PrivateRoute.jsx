import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import User from '../pages/User';

const PrivateRoute = ({ element: Element, userType, ...rest }) => {
    const { user } = useAuth();

    if (!user) {
      return <Navigate to="/login" />;
    }
  
    if (user.userType !== userType) {
      return <Navigate to="/" />;
    }
  
    // return <Element {...rest} />;
    return <User userType={userType}/>;
  };
  
  export default PrivateRoute;