import React from "react";
import Hero from "../components/Hero";
import TypesOfYoga from "../components/TypesOfYoga";
import Place from "../components/Place";
import TypesOfClasses from "../components/TypesOfClasses";
import Pricing from "../components/Pricing";
import Instructor from "../components/Instructor";
const Home = ({userType}) => {
  return (
    <div>

      <Hero userType={userType} />
      <TypesOfYoga />
      <Place />
      <TypesOfClasses />
      <Instructor/>
      <Pricing/>
    </div>
  );
};

export default Home;
