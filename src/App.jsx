import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import User from './pages/User';
import Home from './pages/Home';
import Classes from './pages/Classes';
import Blogs from './pages/Blogs';
import About from './pages/About';
import Contacts from './pages/Contacts';
import Login from './login&signup/Login';
import ForgotPassword from './login&signup/Frogot';
import YogaClassDetails from './pages/YogaClassDetails';
import Recordings from './pages/Recordings';
import BlogsDetails from './pages/BlogsDetails';
import Err404 from './components/Err404';
import { AuthProvider } from './security/AuthContext';
import PrivateRoute from './security/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { statusCode } from './utils/statusFile.mjs';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getYogaContents } from './REDUX_COMPONENTS/FEATURES/yogaContent.mjs';
import { getPremiumData } from './REDUX_COMPONENTS/FEATURES/premiumSlice.mjs';
import PaymentForm from './pages/paymentForm';
import { WebsiteManagementForm } from './components/websiteManagementForm';
import { getHomePageContents } from './REDUX_COMPONENTS/FEATURES/homePageSlice.mjs';
import { getContactPageContents } from './REDUX_COMPONENTS/FEATURES/contactPageSlice.mjs';
import { getAboutPageContents } from './REDUX_COMPONENTS/FEATURES/aboutPageSlice.mjs';
import { getYogaInstructorData } from './REDUX_COMPONENTS/FEATURES/yogaInstructorSlice.mjs';
import { getVideoContents } from './REDUX_COMPONENTS/FEATURES/videosSlice';
import { getBlogs } from './REDUX_COMPONENTS/FEATURES/blogSlice.mjs';

axios.defaults.baseURL = "http://localhost:8000/api/"
// axios.defaults.baseURL = "/api/"
const App = () => {

  const dispatch = useDispatch();

  // useEffect(() => {
  //   axios.post("admin/addContent", { 
  //     contentHeading: "Prenatal Yoga", 
  //     contentLink: "https://youtube.com", 
  //     description: "Focuses on flow and breath, building core strength.", 
  //     indexImage: "Sukh.png" })
  // }, [])
  // useEffect(() => {
  //   axios.post("admin/addPremium", {
  //     premiumName: "Silver Premium",
  //     premiumPeriod: {
  //       numericValue: 30,
  //       alphabetValue: "1 Month"
  //     },
  //     premiumPrice: 500,
  //     discount: 12,
  //     backgroundImage: "Bruk.jpg",
  //     premiumFeatures: ["Average", "Access to every premium video", "Attain live session", "24/7 Consultancy Available"]
  //   })
  // }, [])
  useEffect(() => {
    dispatch(getYogaContents())
    dispatch(getPremiumData())
    dispatch(getHomePageContents())
    dispatch(getContactPageContents())
    dispatch(getAboutPageContents())
    dispatch(getYogaInstructorData())
    dispatch(getVideoContents())
    dispatch(getBlogs())
  }, [])

  const { status: yogaContentStatus } = useSelector(state => state.yogacontent)
  const { status: homepagestatus } = useSelector(state => state.homepage)
  const { status: contactpagestatus } = useSelector(state => state.contactpage)
  const { status: aboutpagestatus } = useSelector(state => state.aboutpage)
  const { status: instructorStatus } = useSelector(state => state.yogainstructor);

  if (contactpagestatus === statusCode.IDLE && homepagestatus === statusCode.IDLE && yogaContentStatus === statusCode.IDLE && aboutpagestatus === statusCode.IDLE && instructorStatus === statusCode.IDLE) {
    return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<User userType="none" />}>
              <Route index element={<Home userType="none" />} />
            </Route>
            <Route path="*" element={<Err404 />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />

            <Route path="/user" element={<PrivateRoute userType="user" element={User} />}>
              <Route index element={<Home userType="user" />} />
              <Route path="classes" element={<Classes userType="user" />} />
              <Route path="classes/:title/:description" element={<YogaClassDetails />} />
              <Route path="blogs" element={<Blogs userType="user" />} />
              <Route path="blogs/:title" element={<BlogsDetails />} />
              <Route path="about" element={<About />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="recordings" element={<Recordings />} />
              <Route path="payment/:paymentDetails" element={<PaymentForm />} />
            </Route>

            <Route path="/admin" element={<PrivateRoute userType="admin" element={User} />}>
              <Route path="contentForm" element={<WebsiteManagementForm />} />
              <Route index element={<Home userType="admin" />} />
              <Route path="classes" element={<Classes userType="admin" />} />
              <Route path="classes/:title" element={<YogaClassDetails />} />
              <Route path="blogs" element={<Blogs userType="admin" />} />
              <Route path="blogs/:title" element={<BlogsDetails />} />
              <Route path="about" element={<About />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="recordings" element={<Recordings userType="admin" />} />
            </Route>
          </Routes>
        </Router>
        <ToastContainer />
      </AuthProvider>
    );
  }
  else if (contactpagestatus === statusCode.LOADING && homepagestatus === statusCode.LOADING && yogaContentStatus === statusCode.LOADING) {

    return (
      <>
        Loading....
      </>
    )
  }
  else if (contactpagestatus === statusCode.EMPTY && homepagestatus === statusCode.EMPTY && yogaContentStatus === statusCode.EMPTY) {
    return (
      <>
        No data available to be shown
      </>
    )
  }
  else {
    return (
      <></>
    )
  }

};

export default App;

