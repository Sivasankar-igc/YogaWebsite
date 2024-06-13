import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVideo, updateVideo, deleteVideo } from "../REDUX_COMPONENTS/FEATURES/videosSlice.js"
import { statusCode } from "../utils/statusFile.mjs";
const AddVideo = ({ forClose, video }) => {
  const modelref = useRef();
  const closeModel = (e) => {
    if (modelref.current === e.target) {
      forClose();
    }
  };

  const [name, setName] = useState(video ? video.heading : "");
  const [link, setLink] = useState(video ? video.videoLink : "");
  const [description, setDescription] = useState(
    video ? video.description : ""
  );
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailURL, setThumbnailURL] = useState(video ? video.image : "");
  // const vids = useSelector((state) => state.videos);

  const dispatch = useDispatch();

  useEffect(() => {
    if (video) {
      setName(video.heading);
      setLink(video.videoLink);
      setDescription(video.description);
      setThumbnailURL(video.image);
    }
  }, [video]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setThumbnailURL(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVideo = {
      heading: name,
      videoLink: link,
      description,
      image: thumbnailURL,
      completed: video ? video.completed : false,
    };

    if (video) {
      dispatch(updateVideo(newVideo));
    } else {
      dispatch(addVideo(newVideo));
    }

    forClose();
  };

  return (
    <div
      ref={modelref}
      onClick={closeModel}
      className="fixed  inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center "
    >
      <form
        onSubmit={handleSubmit}
        className="lg:top-[8rem] top-[5rem]   fixed lg:w-[30rem] py-6 rounded-lg space-y-5 bg-white max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8 md:w-[20rem]"
      >
        <div>
          <label className="font-medium">Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            name="name"
            type="text"
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <div>
          <label className="font-medium">Link</label>
          <input
            onChange={(e) => setLink(e.target.value)}
            value={link}
            name="link"
            type="text"
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>

        <div>
          <label className="font-medium">Choose Thumbnill</label>
          <label for="small-file-input" class="sr-only ">
            Choose file
          </label>
          <input
            onChange={handleThumbnailChange}
            type="file"
            name="small-file-input"
            id="small-file-input"
            className="mt-2 block w-full border  border-gray-700 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-800 file:border-0 file:me-4  file:py-2 file:px-4"
          />
          {/* {thumbnailURL && (
            <img src={thumbnailURL} alt="Thumbnail Preview" className="w-full h-48 rounded-t-md object-cover" />
          )} */}
        </div>

        <div>
          <label className="font-medium">Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            value={description}
            className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-[#779393] text-white px-6 py-2 rounded-full hover:bg-[#75b9b9] transition duration-300
                                "
        >
          {video ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};

const Recordings = ({ userType }) => {
  const { data: videos, status } = useSelector((state) => state.videos);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  const handleEdit = (video) => {
    setCurrentVideo(video);
    setShowModal(true);
  };
  return (
    status === statusCode.IDLE &&
    <section className="ezy__eporder9 gray py-14 md:py-24 bg-white  text-zinc-900 relative overflow-hidden z-10">
      <div className="container px-4 mx-auto">
        <div className="flex justify-center max-w-6xl mx-auto">
          <div className="bg-gray-100  rounded w-full">
            <div className="text-center md:text-end bg-transparent p-4 md:p-6 lg:p-8">
              {userType === "admin" && <button
                onClick={() => {
                  setCurrentVideo(null);
                  setShowModal(true);
                }}
                className="bg-transparent hover:bg-[#779393] hover:text-white border  hover:border-[#779393]  rounded py-2 px-6 ml-2"
              >
                Add Video
              </button>}
            </div>
            <hr className="" />

            {videos.map((item, index) => (
              <div key={item._id} className="p-6 md:p-12">
                <div className="grid grid-cols-12 text-center lg:text-start">
                  <div className="col-span-12 lg:col-span-4">
                    <div>
                      <a href={item.videoLink}>
                        <img
                          src={item.image}
                          alt=""
                          className="w-full h-48 rounded-t-md object-cover"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="col-span-12 lg:col-span-6 lg:pl-6 mt-4 lg:mt-0">
                    <div>
                      <a href={item.videoLink}>
                        <h2 className="text-3xl hover:text-blue-600 font-bold mb-2 cursor-pointer">
                          {item.heading}
                        </h2>
                      </a>
                      <p className="w-full lg:max-w-xl leading-relaxed opacity-80 mb-6">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-12 lg:col-span-2">
                    {userType === "admin" && <div className="flex flex-col gap-5">
                      <div className="col-span-12 lg:col-span-2">
                        <div
                          onClick={() => handleEdit(item)}
                          className="flex items-start justify-center h-full cursor-pointer"
                        >
                          <span className="text-center w-full max-w-[250px] py-2 px-6 rounded-md text-base text-blue-600 bg-blue-100">
                            Edit
                          </span>
                        </div>
                      </div>
                      <div className="col-span-12 lg:col-span-2">
                        <div
                          onClick={() => dispatch(deleteVideo({ id: item.id }))}
                          className="flex items-start justify-center h-full cursor-pointer"
                        >
                          <span className="text-center w-full max-w-[250px] py-2 px-6 rounded-md text-base text-red-600 bg-red-100">
                            Delete
                          </span>
                        </div>
                      </div>
                    </div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showModal && (
        <AddVideo forClose={() => setShowModal(false)} video={currentVideo} />
      )}
    </section>
  );
};

export default Recordings;