import React, { useState } from "react";
import Pageinfo from "../components/Pageinfo";
import BlogsManager from "../components/BlogsManager";
import BlogTypes from "../components/BlogTypes";

export default ({ userType }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Pageinfo name="Blogs" img="bg.png" />

      {userType === "admin" ? <BlogsManager /> : <BlogTypes />}
    </div>
  );
};
