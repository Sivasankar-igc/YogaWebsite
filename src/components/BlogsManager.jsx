import React, { useState } from "react";
import Pageinfo from "./Pageinfo";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

export default () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "The Journey into Yoga: A Beginner's Guide",
      desc: "Discover the transformative power of yoga with our beginner's guide. Learn the basics, from poses to breathing techniques, and start your journey towards balance and wellness.",
      img: "/cart (1).jpeg",
      authorLogo: "avat (1).jpeg",
      authorName: "Mrunal Thakur",
      date: "Apr 18 2024",
      href: "#",
    },
    {
      id: 2,
      title: "Yoga for Mindfulness: Finding Inner Peace",
      desc: "Explore the practice of mindfulness through yoga. Our article delves into techniques that help you connect with the present moment and achieve a state of inner peace.",
      img: "/cart (2).jpeg",
      authorLogo: "/avat (2).jpeg",
      authorName: "Ritik Ranjan",
      date: "Apr 25 2024",
      href: "#",
    },
    {
      id: 3,
      title: "Yoga at Home: Creating Your Sacred Space",
      desc: "Learn how to create a sacred space for your yoga practice at home. We provide tips on setting the right atmosphere to enhance your yoga experience.",
      img: "/cart (3).jpeg",
      authorLogo: "/avat (3).jpeg",
      authorName: "Siva Sankar",
      date: "May 2 2024",
      href: "#",
    },
    {
      id: 4,
      title: "The Healing Power of Yoga: A Wellness Approach",
      desc: "Yoga is not just a physical exercise; it's a healing journey. This article discusses the wellness benefits of yoga and how it promotes physical and mental healing.",
      img: "/cart (4).jpeg",
      authorLogo: "/avat (4).jpeg",
      authorName: "Lipsa Devi",
      date: "May 9 2024",
      href: "#",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editClassData, setEditClassData] = useState(null);
  const [showMore, setShowMore] = useState({});

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSavePost = (post) => {
    if (editClassData) {
      setPosts(posts.map((p) => (p.id === post.id ? post : p)));
    } else {
      setPosts([...posts, { ...post, id: posts.length + 1 }]);
    }
    setEditClassData(null);
    setShowModal(false);
  };

  const handleEditButtonClick = (post) => {
    setEditClassData(post);
    setShowModal(true);
  };

  const handleDeleteClass = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const handleCloseModal = () => {
    setEditClassData(null);
    setShowModal(false);
  };

  const toggleShowMore = (id) => {
    setShowMore((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
      <div className="text-center">
        <p className="mt-3 text-gray-500">
          Blogs that are loved by the community. Updated every hour.
        </p>
        <input
          type="text"
          placeholder="Search posts..."
          className="mt-5 p-3 border rounded-md"
          onChange={handleSearchChange}
        />
      </div>
      <div className="flex justify-end">
        <button
          className="bg-[#779393] text-white px-6 py-2 rounded-full hover:bg-[#75b9b9]"
          onClick={() => setShowModal(true)}
        >
          Add
        </button>
      </div>
      <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((item) => (
          <article
            className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm"
            key={item.id}
          >
            <a href={item.href}>
              <img
                src={item.img}
                loading="lazy"
                alt={item.title}
                className="w-full h-48 rounded-t-md object-cover"
              />
              <div className="flex justify-end p-2">
                <FaEdit onClick={() => handleEditButtonClick(item)} />
                <MdDelete onClick={() => handleDeleteClass(item.id)} />
              </div>
              <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
                <div className="flex-none w-10 h-10 rounded-full">
                  <img
                    src={item.authorLogo}
                    className="w-full h-full rounded-full"
                    alt={item.authorName}
                  />
                </div>
                <div className="ml-3">
                  <span className="block text-gray-900">{item.authorName}</span>
                  <span className="block text-gray-400 text-sm">{item.date}</span>
                </div>
              </div>
              <div className="pt-3 ml-4 mr-2 mb-3">
                <h3 className="text-xl text-gray-900">{item.title}</h3>
                <p className="text-gray-400 text-sm mt-1">
                  {showMore[item.id] ? item.desc : `${item.desc.substring(0, 100)}...`}
                  <Link to={`${item.title}`}> <button
                    onClick={() => toggleShowMore(item.id)}
                    className="text-blue-500"
                  >
                    {showMore[item.id] ? " Show Less" : " Show More"}
                  </button></Link>
                </p>
              </div>
            </a>
          </article>
          
        ))}
        
      </div>
      {showModal && (
        <Modal
          onClose={handleCloseModal}
          onSave={handleSavePost}
          classData={editClassData}
        />
      )}
      
    </section>
    
  );
};

// Define the Modal component here or import it if it's already defined elsewhere
const Modal = ({ onClose, onSave, classData }) => {
  const [formData, setFormData] = useState({
    id: classData ? classData.id : null,
    title: classData ? classData.title : '',
    desc: classData ? classData.desc : '',
    img: classData ? classData.img : '',
    authorLogo: classData ? classData.authorLogo : '',
    authorName: classData ? classData.authorName : '',
    date: classData ? classData.date : '',
    href: classData ? classData.href : '#',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="z-20 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md">
        <h2 className="text-lg font-bold mb-4">{classData ? 'Edit Post' : 'Add Post'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image </label>
            <input
              type="file"
              name="img"
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Link URL</label>
            <input
              type="text"
              name="href"
              value={formData.href}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
