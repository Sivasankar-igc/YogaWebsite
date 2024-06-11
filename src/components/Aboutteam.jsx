import React from "react";

const Aboutteam = ({ props }) => {
  console.log(props)
  return (

    <section className="ezy__header7 light py-10 md:py-24 bg-white  text-zinc-900 dark:text-black px-24  ">
      {/* <div className="col-span-12 lg:col-span-5 xl:col-span-4 text-center lg:text-start">
            <img
              src="pic2.png"
              alt=""
            //   className="border-[20px] border-white dark:border-slate-800 shadow-xl rounded-full mx-auto"
            />
          </div> */}
      <div className="container px-4 mx-auto relative">
        <div className="grid grid-cols-12 gap-6 gap-y-16 lg:gap-y-0">
          <div className="col-span-12 lg:col-span-12 text-center lg:text-start">
            <div className="flex flex-col justify-center h-full">
              {/* <div className="col-span-12 lg:col-span-5 xl:col-span-4 text-center lg:text-start">
            <img
              src="pic2.png"
              alt=""
            //   className="border-[20px] border-white dark:border-slate-800 shadow-xl rounded-full mx-auto"
            />
          </div> */}
              <h2 className="text-3xl font-bold leading-none md:text-[70px] mb-6">
                {props.heading}
              </h2>
              <h2 className="text-2xl leading-normal mb-2  ">
                {props.subHeading}
              </h2>
              <p className="text-xl leading-normal opacity-75 ">{props.description}</p>
              {/* <div className="mt-6 sm:mt-12 flex lg:flex-row flex-col">
                <a
                  href="#!"
                  className="bg-[#678080] py-3 px-8 border-2 border-#4b7878 text-black hover:bg-[#436767] rounded-full mr-2 my-1 duration-300"
                >
                  See my work
                </a>
                <a
                  href="#!"
                  className="py-3 px-8 border-2 border-[#779393] text-[#111212] hover:bg-[#436767] duration-300 hover:text-black rounded-full my-1"
                >
                  Contact me
                </a>
              </div> */}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
export default Aboutteam;
