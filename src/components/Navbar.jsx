import { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";

// Profile Dropdown
const ProfileDropDown = (props) => {
  const [state, setState] = useState(false);
  const profileRef = useRef();

  const navigation = [
    // { title: "Dashboard", path: "javascript:void(0)" },
    // { title: "Settings", path: "javascript:void(0)" },
    // { title: "Log out", path: "javascript:void(0)" },
  ];

  useEffect(() => {
    const handleDropDown = (e) => {
      if (!profileRef.current.contains(e.target)) setState(false);
    };
    document.addEventListener("click", handleDropDown);
  }, []);

  return (
    <div className={`relative ${props.class}`}>
      <div className="flex items-center space-x-4">
        {/* <button
          ref={profileRef}
          className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-indigo-600"
          onClick={() => setState(!state)}
        > */}
        {props.userType == "none" ? (
          <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
            <Link
              to="login"
              className="block text-gray-700 hover:text-gray-900 max-h-10 w-20"
            >
              Log in
            </Link>
            <Link
              to="login"
              className="max-h-10 w-36 flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-[#779393] hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex"
            >
              Sign in
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        ) : (
          <Link
            to="/login"
            className="max-h-10 w-36 flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-[#779393] hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 rotate-180"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
            Sign out
          </Link>
        )}

        {/* </button> */}
      </div>
      <ul
        className={`bg-white top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${state ? "" : "lg:hidden"
          }`}
      >
        {navigation.map((item, idx) => (
          <li>
            <Link
              key={idx}
              className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5"
              to={item.path}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

import React from "react";

const Navbar = ({ userType }) => {
  const [menuState, setMenuState] = useState(false);

  // Replace javascript:void(0) path with your path
  const navigation = [
    { title: "Home", path: "" },
    { title: "Classes", path: "classes" },
    { title: "About", path: "about" },
    { title: "Blog", path: "blogs" },
    { title: "Contact", path: "contacts" },
    ...(userType==="admin"  ? [{ title: "Edit info", path: "contentForm" }] : []),
  ];
  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="flex items-center space-x-8 py-3 px-4 max-w-screen-xl mx-auto md:px-8">
        <div className="flex-none lg:flex-initial">
          <Link to="/user">
            <img
              src="https://benifitsofyogawithmanoj.in/wp-content/uploads/2024/03/logo.svg"
              width={120}
              height={50}
              alt="Yogi"
            />
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-between">
          <div
            className={`bg-white absolute z-20 w-full top-16 left-0 p-4 border-b lg:static lg:block lg:border-none ${menuState ? "" : "hidden"
              }`}
          >
            {userType === "none" ||
              ("admin" && (
                <ul className="mt-12 space-y-5 lg:flex lg:space-x-6 lg:space-y-0 lg:mt-0 ">
                  {navigation.map((item, idx) => (
                    <li className="h-8">
                      {" "}
                      <NavLink
                        onClick={() => setMenuState(!menuState)}
                        end
                        to={item.path}
                        key={idx}
                        className="text-gray-600 hover:text-gray-900 pb-2"
                      >
                        {item.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              ))}
            <ProfileDropDown
              class="mt-5 pt-5 border-t lg:hidden"
              userType={userType}
            />
          </div>
          <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-6">
            <form className="flex items-center space-x-2 border rounded-md p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 flex-none text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                className="w-full outline-none appearance-none placeholder-gray-500 text-gray-500 sm:w-auto"
                type="text"
                placeholder="Search"
              />
            </form>
            <ProfileDropDown class="hidden lg:block" userType={userType} />
            <button
              className="outline-none text-gray-400 block lg:hidden"
              onClick={() => setMenuState(!menuState)}
            >
              {menuState ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
