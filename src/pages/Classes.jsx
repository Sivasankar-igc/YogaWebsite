import React, { useState } from "react";
import Pageinfo from "../components/Pageinfo";
import ClassManager from "../components/ClassManager";
import TypesOfClasses from "../components/TypesOfClasses";

const Classes = ({ userType }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Pageinfo name="Classes" />
      {userType === "admin" ? <ClassManager /> : <TypesOfClasses />}
    </div>
  );
};

export default Classes;
