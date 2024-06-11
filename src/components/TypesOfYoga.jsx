import React, { useState } from "react";
import { useSelector } from "react-redux";

const TypesOfYoga = () => {
  const [showAll, setShowAll] = useState(false);
  const Yog = [
    {
      title: "Hatha Yoga",
      desc: "A slow and mindful practice focusing on basic postures and breath control.",
      img: "Bruk.png",
      href: "javascript:void(0)",
    },
    {
      title: "Iyengar Yoga",
      desc: "Known for its use of props and emphasis on precision and alignment.",
      img: "Sukh.png",
      href: "javascript:void(0)",
    },
    {
      title: "Kundalini Yoga",
      desc: "Combines energy work with breath, movement, and chanting to awaken spiritual energy.",
      img: "Yogini.png",
      href: "javascript:void(0)",
    },
    {
      title: "Ashtanga Yoga",
      desc: "A fixed sequence of postures linked by breath, it's physically demanding.",
      img: "Bruk.png",
      href: "javascript:void(0)",
    },
    {
      title: "Bikram Yoga",
      desc: "Performed in a hot room to promote sweating and flexibility.",
      img: "Sukh.png",
      href: "javascript:void(0)",
    },
    {
      title: "Yin Yoga",
      desc: "A passive style that targets deep connective tissues, holding poses for longer periods.",
      img: "Yogini.png",
      href: "javascript:void(0)",
    },
    {
      title: "Restorative Yoga",
      desc: "Uses props to support the body, encouraging deep relaxation.",
      img: "Bruk.png",
      href: "javascript:void(0)",
    },
    {
      title: "Jivamukti Yoga",
      desc: "Integrates physical, ethical, and spiritual elements for a holistic practice.",
      img: "Sukh.png",
      href: "javascript:void(0)",
    },
    {
      title: "Aerial Yoga",
      desc: "Uses a hammock to perform yoga poses in the air, adding an acrobatic element.",
      img: "Yogini.png",
      href: "javascript:void(0)",
    },
    {
      title: "Core Strength Vinyasa Yoga",
      desc: "Focuses on flow and breath, building core strength.",
      img: "Bruk.png",
      href: "javascript:void(0)",
    },
    {
      title: "Prenatal Yoga",
      desc: "Tailored for expectant mothers, offering a safe and supportive environment.",
      img: "Sukh.png",
      href: "javascript:void(0)",
    },
    {
      title: "Anusara Yoga",
      desc: "A playful style that often includes partner work and focuses on heart-opening poses.",
      img: "Yogini.png",
      href: "javascript:void(0)",
    },
    {
      title: "Acro Yoga",
      desc: "Combines yoga and acrobatics, emphasizing partner work and inversions.",
      img: "Bruk.png",
      href: "javascript:void(0)",
    },
  ];

  const { data: yogaContents } = useSelector(state => state.yogacontent);
  const { data: homepagedata } = useSelector(state => state.homepage);

  const displayedYog = showAll ? yogaContents : yogaContents.slice(0, 6);
  return (
    <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
      <div className="text-center">
        <h1 className="text-3xl text-gray-800 font-semibold">
          {homepagedata.yogaTypeShowCase.heading}
        </h1>
        <p className="mt-3 text-gray-500">
          {homepagedata.yogaTypeShowCase.subHeading}
        </p>
      </div>
      <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {
          displayedYog.map((item, index) => (
            <article
              className="max-w-md mx-auto mt-4  rounded-md duration-300  hover:shadow-lg"
              key={item.contentId}
            >
              <a href={item.contentLink}>
                <img
                  src={item.indexImage}
                  loading="lazy"
                  alt={item.contentHeading}
                  className="w-full h-48 rounded-t-md object-contain"
                />
                <div className="pt-3 ml-4 mr-2 mb-3 flex flex-col justify-center items-center">
                  <h3 className="text-xl text-gray-900">{item.contentHeading}</h3>
                  <p className="text-[#779393] font-semibold text-sm mt-1 text-center">{item.description}</p>
                </div>
              </a>
            </article>
          ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="bg-[#779393] text-white px-6 py-2 rounded-full hover:bg-[#75b9b9] transition duration-300"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      </div>
    </section>
  );
};

export default TypesOfYoga;
