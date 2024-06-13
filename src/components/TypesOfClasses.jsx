import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TypesOfClasses = () => {
  const [showAll, setShowAll] = useState(false);
  const { data: yogaContents } = useSelector(state => state.yogacontent);
  const { data: homepagedata } = useSelector(state => state.homepage)

  const displayedYog = showAll ? yogaContents : yogaContents.slice(0, 8);
  return (
    <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
      <div className="text-center">
        <h1 className=" text-3xl text-gray-800 font-semibold">
          {homepagedata.popularClassess.heading}
        </h1>
        <p className="mt-3 text-gray-500">
          {homepagedata.popularClassess.subHeading}
        </p>
      </div>

      <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {
          displayedYog.map((item, index) => (
            <Link to={`${item.contentHeading}/${item.description}`}>
              <article
                className="max-w-md mx-auto mt-4  rounded-md duration-300  hover:shadow-lg"
                key={item.contentId}
              >
                <a href={item.contentLink}>
                  <img
                    src={`/${item.indexImage}`}
                    loading="lazy"
                    alt={item.contentHeading}
                    className="w-full h-48 rounded-t-md object-contain"
                  />
                  <div className="pt-3 ml-4 mr-2 mb-3 flex flex-col justify-center items-center">
                    <h3 className="text-xl text-gray-900">{item.contentHeading}</h3>
                    <p className="text-[#779393] font-semibold text-sm mt-1 text-center">
                      {item.description}
                    </p>
                  </div>
                </a>
              </article>
            </Link>
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

export default TypesOfClasses;
