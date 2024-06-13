import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { useDispatch } from "react-redux"
import { toast } from "react-toastify";
import { addUser } from "../REDUX_COMPONENTS/FEATURES/userSlice.mjs";



const SocialLoginButton = () => (
  <Fragment>
    <button className="bg-blue-600 text-white py-3 px-6 rounded w-full flex items-center justify-center mt-4">
      <FontAwesomeIcon icon={faFacebook} className=" mr-2 text-white" />
      <span className="text-center">Continue with Facebook</span>
    </button>
    <button className="bg-red-500 text-white py-3 px-6 rounded w-full flex items-center justify-center mt-4">
      <FontAwesomeIcon icon={faGoogle} className=" mr-2 text-white" />
      <span className="text-center">Continue with Google</span>
    </button>
  </Fragment>
);

const SignInForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [validated, setValidated] = useState(false);
  const [userDetails, setUserDetails] = useState({
    emailId: "",
    password: ""
  })

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  const { login } = useAuth();

  const handleUserDetails = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = (type) => {


    axios.post(`/${type}/${type}Login`, {
      emailId: userDetails.emailId,
      password: userDetails.password
    })
      .then(res => {
        let status = res.data.status;
        let message = res.data.message;

        if (status === false) {
          toast(message)
        } else {
          login({ userType: type });
          if (type === "admin") {
            navigate("/admin");
          } else if (type === "user") {
            dispatch(addUser(message))
            navigate("/user");
          }
        }
      })
      .catch(err => {
        console.error(`Login Error --> ${err}`)
        toast("Network connection error!!!")
      })
  };

  return (
    <form noValidate validated={validated.toString()} onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type="text"
          className="w-full bg-blue-50 dark:bg-slate-700 min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-blue-600"
          id="email"
          placeholder="Email"
          name="emailId"
          onChange={handleUserDetails}
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          className="w-full bg-blue-50 dark:bg-slate-700 min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-blue-600"
          id="password"
          placeholder="Password"
          name="password"
          onChange={handleUserDetails}
        />
      </div>
      <div className="mb-4">
        <input
          type="checkbox"
          className="mr-2"
          id="remember-me"
          defaultChecked
        />
        <label className="font-normal" htmlFor="remember-me">
          Remember me
        </label>
      </div>
      <button
        onClick={() => handleLogin("user")}
        className="bg-[#779393] text-white py-3 px-6 rounded w-full mb-5"
      >
        Log In
      </button>
      <button
        onClick={() => handleLogin("admin")}
        className="bg-[#779393] text-white py-3 px-6 rounded w-full"
      >
        Admin Log In
      </button>
      <button
        onClick={() => navigate("/forgotpassword")}
        className="hover:text-blue-600 py-2 px-4 rounded-lg w-full"
      >
        Forget your password?
      </button>
      {/* <div className="relative">
        <hr className="my-8 border-t border-gray-300" />
        <span className="px-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#0b1727]">
          Or
        </span>
      </div>

      <SocialLoginButton /> */}
    </form>
  );
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth()

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    day: "",
    month: "",
    year: "",
    emailId: "",
    phno: "",
    gender: "",
    password: "",
    confirmPassword: ""
  })

  const handleUserDetails = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (userDetails.password === "") {
      window.alert("Password can't be empty!!!")
      return;
    } else if (userDetails.password !== userDetails.confirmPassword) {
      window.alert("Confirm password and password must be same!!!")
      return;
    } else {
      axios.post("user/signin", {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        emailId: userDetails.emailId,
        phno: userDetails.phno,
        gender: userDetails.gender,
        day: userDetails.day,
        month: userDetails.month,
        year: userDetails.year,
        password: userDetails.password
      })
        .then((res) => {
          let response = res.data;
          let status = response.status;
          let message = response.message;
          if (status === false && message !== null) {
            toast(message)
          } else if (status === false && message === null) {
            toast("Something went wrong !!!")
          } else if (status === true) {
            dispatch(addUser(message))

            login({ userType: "user" });
            navigate("/user");
          }
        })
        .catch(err => {
          toast("Network connection error!!!")
          console.error(`Sign In Error --> ${err}`)
        })
    }

    setValidated(true);
  };

  const dayList = Array.from({ length: 31 }, (_, i) => i + 1);
  const monthList = [
    { label: "January", value: "Jan" },
    { label: "February", value: "Feb" },
    { label: "March", value: "March" },
    { label: "April", value: "April" },
    { label: "May", value: "May" },
    { label: "June", value: "June" },
    { label: "July", value: "July" },
    { label: "August", value: "Aug" },
    { label: "September", value: "Sep" },
    { label: "October", value: "Oct" },
    { label: "November", value: "Nov" },
    { label: "December", value: "Dec" },
  ];
  const yearList = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );

  return (
    <form noValidate validated={validated.toString()} onSubmit={handleSubmit} >
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col mb-6 mx-2">
            <label htmlFor="first-name" className="mb-2">
              First Name
            </label>
            <input
              type="text"
              className="bg-blue-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-xl min-h-[54px] leading-10 px-4 focus:outline-none focus:bg-blue-100 dark:focus:bg-opacity-100"
              id="first-name"
              placeholder="Your First Name"
              name="firstName"
              onChange={handleUserDetails}
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col mb-6 mx-2">
            <label htmlFor="last-name" className="mb-2">
              Last Name
            </label>
            <input
              type="text"
              className="bg-blue-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-xl min-h-[54px] leading-10 px-4 focus:outline-none focus:bg-blue-100 dark:focus:bg-opacity-100"
              id="last-name"
              placeholder="Your Last Name"
              name="lastName"
              onChange={handleUserDetails}
            />
          </div>
        </div>
        <div className="w-full">
          <div className="mb-6">
            <label htmlFor="birth-date" className="mb-2">
              Birth date
            </label>
            <div className="w-full flex rounded-xl overflow-hidden">
              <select
                className="min-h-[54px] leading-10 bg-blue-50 dark:bg-slate-700 dark:bg-opacity-50 focus:outline-none focus:bg-blue-100 dark:focus:bg-opacity-100 border-r border-gray-300 dark:border-gray-700 w-1/3 px-4"
                name="day"
                onChange={handleUserDetails}
              >
                <option hidden defaultValue>
                  Day
                </option>
                {dayList.map((day, i) => (
                  <option value={day} key={i}>
                    {day}
                  </option>
                ))}
              </select>
              <select
                className="min-h-[54px] leading-10 bg-blue-50 dark:bg-slate-700 dark:bg-opacity-50 focus:outline-none focus:bg-blue-100 dark:focus:bg-opacity-100 border-r border-gray-300 dark:border-gray-700 w-1/3 px-4"
                name="month"
                onChange={handleUserDetails}
              >
                <option hidden defaultValue>
                  Month
                </option>
                {monthList.map(({ label, value }, i) => (
                  <option value={value} key={i}>
                    {label}
                  </option>
                ))}
              </select>
              <select
                className="min-h-[54px] leading-10 bg-blue-50 dark:bg-slate-700 dark:bg-opacity-50 focus:outline-none focus:bg-blue-100 dark:focus:bg-opacity-100 w-1/3 px-4"
                name="year"
                onChange={handleUserDetails}
              >
                <option hidden defaultValue>
                  Year
                </option>
                {yearList.map((year, i) => (
                  <option value={year} key={i}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col mb-6 mx-2">
            <label htmlFor="gender" className="mb-2">
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              className="bg-blue-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-xl min-h-[54px] leading-10 px-4 focus:outline-none focus:bg-blue-100 dark:focus:bg-opacity-100"
              onChange={handleUserDetails}
            >
              <option hidden defaultValue>Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col mb-6 mx-2">
            <label htmlFor="email" className="mb-2">
              Email
            </label>
            <input
              type="email"
              className="bg-blue-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-xl min-h-[54px] leading-10 px-4 focus:outline-none focus:bg-blue-100 dark:focus:bg-opacity-100"
              id="email"
              placeholder="Email"
              name="emailId"
              onChange={handleUserDetails}
            />
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col mb-6 mx-2">
            <label htmlFor="email" className="mb-2">
              Phone
            </label>
            <input
              type="phone"
              className="bg-blue-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-xl min-h-[54px] leading-10 px-4 focus:outline-none focus:bg-blue-100 dark:focus:bg-opacity-100"
              id="phone"
              placeholder="Phone"
              name="phno"
              onChange={handleUserDetails}
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col mb-6 mx-2">
            <label htmlFor="password" className="mb-2">
              Password
            </label>
            <input
              type="password"
              className="bg-blue-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-xl min-h-[54px] leading-10 px-4 focus:outline-none focus:bg-blue-100 dark:focus:bg-opacity-100"
              id="password"
              placeholder="Password"
              name="password"
              onChange={handleUserDetails}
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col mb-6 mx-2">
            <label htmlFor="con-pass" className="mb-2">
              Confirm Password
            </label>
            <input
              type="text"
              className="bg-blue-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-xl min-h-[54px] leading-10 px-4 focus:outline-none focus:bg-blue-100 dark:focus:bg-opacity-100"
              id="con-pass"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleUserDetails}
            />
          </div>
        </div>
      </div>
      <div className="mb-6">
        <div className="form-check">
          <input className="rounded-lg" type="checkbox" value="" id="agree" />
          <label className="rounded-lg" htmlFor="agree">
            {" "}
            I accept to the{" "}
            <a href="#!" className="underline">
              terms & condition
            </a>
            ,
            <a href="#!" className="underline">
              privacy policy
            </a>
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="bg-[#779393] text-white px-7 py-3 rounded w-full"
      >
        Sign Up
      </button>
    </form>
  );
};

const SignInSignUp = () => {
  const [active, setActive] = useState("signIn");

  return (
    <section className="ezy__signin9 light bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-12 h-full">
          <div className="col-span-12 lg:col-span-6 lg:col-start-7 order-2">
            <div
              className="min-h-screen h-full hidden lg:block  w-full lg:w-[50vw] bg-cover bg-center bg-no-repeat float-left"
              style={{
                backgroundImage: "url('model.jpeg')",
              }}
            ></div>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-2 py-14 lg:py-24 lg:pb-32">
            <div className="flex items-center justify-center h-full">
              <div className="w-full max-w-xl mx-auto">
                <div className="text-center mb-6 lg:mb-12">
                  <div className="bg-blue-50 dark:bg-slate-700 w-64 flex justify-center mx-auto rounded-xl p-2">
                    <button
                      className={`${active === "signIn"
                        ? "bg-white dark:bg-slate-800 text-black dark:text-white rounded-xl"
                        : ""
                        } py-3 w-1/2 h-full opacity-60`}
                      onClick={() => setActive("signIn")}
                    >
                      Sign In
                    </button>
                    <button
                      className={`${active === "signUp"
                        ? "bg-white dark:bg-slate-800 text-black dark:text-white rounded-xl"
                        : ""
                        } py-3 w-1/2 h-full opacity-60`}
                      onClick={() => setActive("signUp")}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
                {active === "signIn" ? <SignInForm /> : <SignUpForm />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInSignUp;