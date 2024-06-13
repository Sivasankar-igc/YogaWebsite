import React, { useState } from "react";
import Pageinfo from "./Pageinfo";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"
import { statusCode } from "../utils/statusFile.mjs";

export default () => {
  const [posts] = useState([
    {
      title: "The Journey into Yoga: A Beginner's Guide",
      desc: "Discover the transformative power of yoga with our beginner's guide. Learn the basics, from poses to breathing techniques, and start your journey towards balance and wellness.",
      img: "../cart (1).jpeg", // Replace with your image path
      authorLogo: "../avat (1).jpeg", // Replace with your image path
      authorName: "Mrunal Thakur",
      date: "Apr 18 2024",
      href: "#", // Replace with your link
    },
    {
      title: "Yoga for Mindfulness: Finding Inner Peace",
      desc: "Explore the practice of mindfulness through yoga. Our article delves into techniques that help you connect with the present moment and achieve a state of inner peace.",
      img: "../cart (2).jpeg", // Replace with your image path
      authorLogo: "../avat (2).jpeg", // Replace with your image path
      authorName: "Ritik Ranjan",
      date: "Apr 25 2024",
      href: "#", // Replace with your link
    },
    {
      title: "Yoga at Home: Creating Your Sacred Space",
      desc: "Learn how to create a sacred space for your yoga practice at home. We provide tips on setting the right atmosphere to enhance your yoga experience.",
      img: "../cart (3).jpeg", // Replace with your image path
      authorLogo: "../avat (3).jpeg", // Replace with your image path
      authorName: "Siva Sankar",
      date: "May 2 2024",
      href: "#", // Replace with your link
    },
    {
      title: "The Healing Power of Yoga: A Wellness Approach",
      desc: "Yoga is not just a physical exercise; it's a healing journey. This article discusses the wellness benefits of yoga and how it promotes physical and mental healing.",
      img: "../cart (4).jpeg", // Replace with your image path
      authorLogo: "../avat (4).jpeg", // Replace with your image path
      authorName: "Lipsa Devi",
      date: "May 9 2024",
      href: "#", // Replace with your link
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const { status, data: blogs } = useSelector(state => state.blog)

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPosts = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    status === statusCode.IDLE
      ? <div className="flex flex-col justify-center items-center w-full">
        <div className="text-center">
          <p className="mt-3 text-gray-500">
            Blogs that are loved by the community. Updated every hour.
          </p>
          <input
            type="search"
            placeholder="Search posts..."
            className="mt-5 p-3 border rounded-md"
            onChange={handleSearchChange}
          />
        </div>
        <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 w-[80%]">
          {filteredPosts.map((item, key) => (
            <Link to={`${item.title}`}>
              <article
                className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm"
                key={item._id}
              >
                <img
                  src={item.indexImage}
                  loading="lazy"
                  alt={item.title}
                  className="w-full h-48 rounded-t-md object-cover"
                />
                <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
                  <div className="flex-none w-10 h-10 rounded-full">
                    <img
                      src={item.authorImage}
                      className="w-full h-full rounded-full"
                      alt={item.author}
                    />
                  </div>
                  <div className="ml-3">
                    <span className="block text-gray-900">
                      {item.author}
                    </span>
                    <span className="block text-gray-400 text-sm">
                      {item.postedAt.date}
                    </span>
                  </div>
                </div>
                <div className="pt-3 ml-4 mr-2 mb-3">
                  <h3 className="text-xl text-gray-900">{item.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
      : status === statusCode.LOADING
        ? <p>Loading...</p>
        : status === statusCode.EMPTY
          ? <p>Nothing to show here!!!</p>
          : <p>Something went wrong!!!</p>
  );
};
