import {React, useEffect }from "react";
import Hero from "../components/Hero";
import TypesOfYoga from "../components/TypesOfYoga";
import Place from "../components/Place";
import TypesOfClasses from "../components/TypesOfClasses";
import Pricing from "../components/Pricing";
import Instructor from "../components/Instructor";
import { useSelector } from 'react-redux';
import { statusCode } from '../utils/statusFile.mjs';
import { Navigate, useNavigate } from 'react-router-dom';
const Home = ({ userType }) => {

  return (
    <div>

      <Hero userType={userType} />
      <TypesOfYoga />
      <Place />
      <TypesOfClasses userType={userType}/>
      <Instructor />
      <Pricing />
    </div>
  );
};

export default Home;
