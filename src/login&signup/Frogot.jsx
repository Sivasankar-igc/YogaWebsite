import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";

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
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, e.g., send reset link to the email
    setSubmitted(true);
  };

  return (
    <section className="ezy__forgot-password bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-12 h-full">
          <div className="col-span-12 lg:col-span-6 lg:col-start-7 order-2">
            <div
              className="hidden lg:block h-full w-full lg:w-[50vw] bg-cover bg-center bg-no-repeat float-left"
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
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                </div>
                {submitted ? (
                  <div className="text-center">
                    <p className="text-green-600 dark:text-green-400">
                      A reset link has been sent to your email address.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
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
                      Send Reset Link
                    </button>
                  </form>
                )}
                <div className="relative mt-6">
                  <hr className="my-8 border-t border-gray-300" />
                  <span className="px-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#0b1727]">
                    Or
                  </span>
                </div>
                <SocialLoginButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
