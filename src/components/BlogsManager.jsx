import React, { useState } from "react";
import Pageinfo from "./Pageinfo";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import blogCol from "../../../server/Models/blogModel.mjs";
import { useDispatch, useSelector } from "react-redux";
import { addBlog, modifyBlog, removeBlog } from "../REDUX_COMPONENTS/FEATURES/blogSlice.mjs";
import { toast } from "react-toastify";
import { statusCode } from "../utils/statusFile.mjs";

export default () => {

  const { status, data: blogs } = useSelector(state => state.blog)

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editClassData, setEditClassData] = useState(null);
  const [showMore, setShowMore] = useState({});
  const dispatch = useDispatch()

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPosts = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSavePost = (post) => {
    if (editClassData) {
      axios.put(`admin/modifyBlog/${post._id}`, { author: post.author, title: post.title, description: post.description, indexImage: post.indexImage, authorImage: post.authorImage })
        .then(res => {
          const { status, message } = res.data;
          if (status) {
            dispatch(modifyBlog(post))
            toast("Blog modified successfully!!!")
          } else {
            toast("Something went wrong!!!")
          }
        })
        .catch(err => {
          console.error(`Cientside error : blog modification --> ${err}`)
          toast("Network connection error!!!")
        })
    } else {
      axios.post("admin/addBlog", { author: post.author, authorImage: post.authorImage, indexImage: post.indexImage, title: post.title, description: post.description })
        .then(res => {
          const { status, message } = res.data;
          if (status) {
            dispatch(addBlog(message))
            toast("Blog added successfully!!!")
          } else {
            toast("Something went wrong!!!")
          }
        })
        .catch(err => {
          console.error(`Clientside error : adding blog --> ${err}`)
          toast("Network connection error!!!")
        })
    }
    setEditClassData(null);
    setShowModal(false);
  };

  const handleEditButtonClick = (post) => {
    setEditClassData(post);
    setShowModal(true);
  };

  const handleDeleteClass = (postId) => {
    if (postId) {
      axios.delete(`admin/removeBlog/${postId}`)
        .then(res => {
          if (res.data) {
            dispatch(removeBlog(postId))
            toast("Blog Removed Successfully!!!")
          } else {
            toast("Something went wrong!!!")
          }
        })
        .catch(err => {
          console.error(`Clientside error : removing blog --> ${err}`)
          toast("Network connection error!!!")
        })
    }
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
    status === statusCode.IDLE
      ? <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
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
              key={item._id}
            >
              <img
                src={`/${item.indexImage}`}
                loading="lazy"
                alt={item.title}
                className="w-full h-48 rounded-t-md object-cover"
              />
              <div className="flex justify-end p-2">
                <FaEdit onClick={() => handleEditButtonClick(item)} style={{ cursor: "pointer" }} />
                <MdDelete onClick={() => handleDeleteClass(item._id)} style={{ cursor: "pointer" }} />
              </div>
              <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
                <div className="flex-none w-10 h-10 rounded-full">
                  <img
                    src={`/${item.authorImage}`}
                    className="w-full h-full rounded-full"
                    alt={item.author}
                  />
                </div>
                <div className="ml-3">
                  <span className="block text-gray-900">{item.author}</span>
                  <span className="block text-gray-400 text-sm">{item.postedAt.date}</span>
                </div>
              </div>
              <div className="pt-3 ml-4 mr-2 mb-3">
                <h3 className="text-xl text-gray-900">{item.title}</h3>
                <p className="text-gray-400 text-sm mt-1">
                  {showMore[item.id] ? item.desc : `${item.description.substring(0, 100)}...`}
                  <Link to={`${item.title}`}> <button
                    onClick={() => toggleShowMore(item._id)}
                    className="text-blue-500"
                  >
                    {showMore[item._id] ? " Show Less" : " Show More"}
                  </button></Link>
                </p>
              </div>
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
      : status === statusCode.LOADING
        ? <p>Loading....</p>
        : status === statusCode.EMPTY
          ? <p>Nothing to show here</p>
          : <p>Something went wrong!!!</p>
  );
};

// Define the Modal component here or import it if it's already defined elsewhere
const Modal = ({ onClose, onSave, classData }) => {
  const [formData, setFormData] = useState({
    _id: classData ? classData._id : "",
    title: classData ? classData.title : '',
    description: classData ? classData.description : '',
    indexImage: classData ? classData.indexImage : '',
    authorImage: classData ? classData.authorImage : '',
    author: classData ? classData.author : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImage = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0].name
    })
  }

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
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Blog Image</label>
            <input
              type="file"
              name="indexImage"
              onChange={handleImage}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Author Name</label>
            <textarea
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Author Image</label>
            <input
              type="file"
              name="authorImage"
              onChange={handleImage}
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
