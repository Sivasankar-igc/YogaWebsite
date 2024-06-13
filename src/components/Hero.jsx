import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Hero = ({ userType }) => {
  const { data } = useSelector(state => state.homepage)
  return (
    <section className="ezy__header7 light py-14 md:py-24 bg-white  text-zinc-900  mx-10">
      <div className="container mx-auto relative">
        <div className="grid grid-cols-12 gap-6 gap-y-16 lg:gap-y-0">
          <div className="col-span-12 lg:col-span-7 text-center lg:text-start">
            <div className="flex flex-col justify-center h-full">
              <p className="text-xl leading-normal mb-2 opacity-50">
                {data.heroSection.subHeading}
              </p>
              <h2 className="text-3xl font-bold leading-none md:text-[70px] mb-6">
                {data.heroSection.heading}
              </h2>
              <p className="text-xl leading-normal opacity-75">
                {data.heroSection.description}
              </p>
              {userType === "none" || "admin" && <div className="mt-6 sm:mt-12 flex lg:flex-row flex-col">
                <a
                  href="#!"
                  className="bg-[#779393] py-3 px-8 border-2 border-[#779393] text-white hover:bg-opacity-90 rounded-full mr-2 my-1 duration-300"
                >
                  Join Class
                </a>
                <Link
                  to={'recordings'}
                  className="py-3 px-8 border-2 border-[#779393] text-[#779393] hover:bg-[#779393] duration-300 hover:text-white rounded-full my-1"
                >
                  Access recordings
                </Link>
              </div>}
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5 xl:col-span-4 text-center lg:text-start">
            <img
              // src={"./Yogini.png"}
              src={"http://localhost:8000/homePageImages/"+data.heroSection.image}
              alt=""
              className="border-[20px] border-white  shadow-xl rounded-full mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;