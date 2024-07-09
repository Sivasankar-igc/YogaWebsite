import React, { useState, useSyncExternalStore } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { toast } from "react-toastify";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const SocialLoginButton = () => (
  <React.Fragment>
    <button className="bg-blue-600 text-white py-3 px-6 rounded w-full flex items-center justify-center mt-4">
      <FontAwesomeIcon icon={faFacebook} className="mr-2 text-white" />
      <span className="text-center">Continue with Facebook</span>
    </button>
    <button className="bg-red-500 text-white py-3 px-6 rounded w-full flex items-center justify-center mt-4">
      <FontAwesomeIcon icon={faGoogle} className="mr-2 text-white" />
      <span className="text-center">Continue with Google</span>
    </button>
  </React.Fragment>
);

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [repass, setRepass] = useState("")
  const [otp, setOTP] = useState("");
  const [checkOTP, setCheckOTP] = useState("")
  const [submitted, setSubmitted] = useState(false);
  const [isOTPCorrect, setIsOTPCorrect] = useState(false)
  const nav = useNavigate()

  const sendOTP = (event) => {
    event.preventDefault();
    axios.get(`user/sendOTP/?mailId=${email}`)
      .then(res => {
        if (res.data !== "") {
          setSubmitted(true)
          setOTP(res.data)
        } else {
          toast("Something went wrong")
        }
      })
      .catch(err => {
        console.error(`Clientside error : couldn't retrieve OTP --> ${err}`)
        toast("Network connection error")
      })
  };

  const handleOTPValidation = (e) => {
    e.preventDefault()
    otp === checkOTP ? setIsOTPCorrect(true) : toast("Wrong OTP")
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (password === repass) {
      axios.post("user/resetPassword", { email, password })
        .then(res => res.data ? nav("/login") : toast("Something went wrong"))
        .catch(err => {
          toast("Network connection error");
          console.error(`Forgot password --> ${err}`)
        })
    } else toast("Password and confirm password must be same");
  }

  return (
    <section className="ezy__forgot-password bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-12 h-full">
          <div className="col-span-12 lg:col-span-6 lg:col-start-7 order-2">
            <div
              className="h-screen hidden lg:block h-full w-full lg:w-[50vw] bg-cover bg-center bg-no-repeat float-left"
              style={{
                backgroundImage:
                  "url('forgot.jpeg')",
              }}
            ></div>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-2 py-14 lg:py-24 lg:pb-32">
            <div className="flex items-center justify-center h-full">
              <div className="w-full max-w-xl mx-auto">
                <div className="text-center mb-6 lg:mb-12">
                  <h2 className="text-2xl font-bold">Forgot Password</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Enter your email address and we'll send you an OTP to reset your password.
                  </p>
                </div>
                {
                  submitted ?
                    isOTPCorrect
                      ? <form onSubmit={handlePasswordSubmit} noValidate>
                        <div className="mb-4">
                          <input
                            type="text"
                            className="w-full bg-blue-50 dark:bg-slate-700 min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-blue-600"
                            id="password"
                            placeholder="PASSWORD"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <input
                            type="password"
                            className="w-full bg-blue-50 dark:bg-slate-700 min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-blue-600"
                            id="re-password"
                            placeholder="RE-ENTER PASSWORD"
                            value={repass}
                            onChange={(e) => setRepass(e.target.value)}
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="bg-indigo-900 text-white py-3 px-6 rounded w-full"
                        >
                          Set New Password
                        </button>
                      </form>
                      : <form onSubmit={handleOTPValidation} noValidate>
                        <div className="mb-4">
                          <input
                            type="text"
                            className="w-full bg-blue-50 dark:bg-slate-700 min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-blue-600"
                            id="otp"
                            placeholder="OTP"
                            value={checkOTP}
                            onChange={(e) => setCheckOTP(e.target.value)}
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="bg-indigo-900 text-white py-3 px-6 rounded w-full"
                        >
                          Validate OTP
                        </button>
                      </form>
                    : <form onSubmit={sendOTP} noValidate>
                      <div className="mb-4">
                        <input
                          type="email"
                          className="w-full bg-blue-50 dark:bg-slate-700 min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-blue-600"
                          id="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-indigo-900 text-white py-3 px-6 rounded w-full"
                      >
                        Send OTP
                      </button>
                    </form>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;