// NavigateToUser.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { statusCode } from "../utils/statusFile.mjs";
import { useAuth } from './AuthContext';

const NavigateToUser = ({ children }) => {
    const navigate = useNavigate();
    const { status: userStatus } = useSelector(state => state.user);
    const { setUser } = useAuth()

    useEffect(() => {
        if (userStatus === statusCode.IDLE) {
            setUser({ userType: "user" })
            navigate('/user');
        } else {
            navigate("/")
        }
    }, [userStatus]);

    return children;
};

export default NavigateToUser;
