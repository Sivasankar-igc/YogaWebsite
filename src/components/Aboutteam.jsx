import React from "react";

const Aboutteam = ({ props }) => {

  return (

    <section className="ezy__header7 light py-10 md:py-24 bg-white  text-zinc-900 dark:text-black px-24  ">
      <div className="container px-4 mx-auto relative">
        <div className="grid grid-cols-12 gap-6 gap-y-16 lg:gap-y-0">
          <div className="col-span-12 lg:col-span-12 text-center lg:text-start">
            <div className="flex flex-col justify-center h-full">
              <h2 className="text-3xl font-bold leading-none md:text-[70px] mb-6">
                {props.heading}
              </h2>
              <h2 className="text-2xl leading-normal mb-2  ">
                {props.subHeading}
              </h2>
              <p className="text-xl leading-normal opacity-75 ">{props.description}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
export default Aboutteam;
