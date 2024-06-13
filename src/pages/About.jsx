import React from "react";
import Pageinfo from "../components/Pageinfo";
import Aboutteam from "../components/Aboutteam";
import Allphotos from "../components/Allphotos";
import { useSelector } from "react-redux";

const About = () => {
  const { data } = useSelector(state => state.aboutpage);
  
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Pageinfo name="About" img="mordenyogi.jpeg" />
      <div className="col-span-12 lg:col-span-5 xl:col-span-4 text-center lg:text-start">
        <img
          src={"http://localhost:8000/aboutPageImages/" + data.image}
          alt=""
          className="h-1/2 w-1/2  border-[5px] border-white  shadow-xl rounded-full mx-auto"
        />
      </div>
      <Aboutteam props={data} />
      <Allphotos />
    </div>
  );
};

export default About;