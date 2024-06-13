import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { modifyHomePage } from "../REDUX_COMPONENTS/FEATURES/homePageSlice.mjs";
import { modifyContactPage } from "../REDUX_COMPONENTS/FEATURES/contactPageSlice.mjs";
import { modifyAboutPage } from "../REDUX_COMPONENTS/FEATURES/aboutPageSlice.mjs";
import { useNavigate } from "react-router-dom";
import YogaInstructorHandler from "./yogaInstructorForm";

const handleImageUploading = async (e, route) => {
  const { files } = e.target;
  const formData = new FormData();
  formData.append("file", files[0]);

  try {
    const response = await axios.put(`admin/upload${route}Image`, formData);
    const { status, message } = response.data;

    if (status) {
      toast("Image uploaded successfully!!!");
      return { status: true, fileName: message };
    } else {
      toast("Image couldn't be uploaded!!!");
      return { status: false, fileName: message };
    }
  } catch (error) {
    console.error(`Image uploading error --> ${error}`);
    toast("Network connection error!!!");
    return { status: false, fileName: message };
  }
};

const HomePageForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { data } = useSelector((state) => state.homepage);

  const [homePageData, setHomePageData] = useState({
    _id: data._id,
    heroSection: {
      heading: data.heroSection.heading,
      description: data.heroSection.description,
      image: data.heroSection.image,
      subHeading: data.heroSection.subHeading,
    },
    yogaTypeShowCase: {
      heading: data.yogaTypeShowCase.heading,
      subHeading: data.yogaTypeShowCase.subHeading,
    },
    yogaStudioShowCase: {
      heading: data.yogaStudioShowCase.heading,
      description: data.yogaStudioShowCase.description,
      image: data.yogaStudioShowCase.image,
      address: data.yogaStudioShowCase.address,
      mapAddress: data.yogaStudioShowCase.mapAddress,
    },
    popularClassess: {
      heading: data.popularClassess.heading,
      subHeading: data.popularClassess.subHeading,
    },
    yogaInstructorShowCase: {
      heading: data.yogaInstructorShowCase.heading,
      subHeading: data.yogaInstructorShowCase.subHeading,
    },
    pricingShowCase: {
      heading: data.pricingShowCase.heading,
      subHeading: data.pricingShowCase.subHeading,
    },
  });

  const handleHomePageDetails = (e, obj, key) => {
    const { name, value } = e.target;
    setHomePageData({
      ...homePageData,
      [key]: {
        ...obj,
        [name]: value,
      },
    });
  };

  const uploadImage = async (e, route, obj, key) => {
    setIsLoading(true);
    const { status, fileName } = await handleImageUploading(
      e,
      route,
      setIsLoading
    );
    const { name } = e.target;

    if (status) {
      setHomePageData({
        ...homePageData,
        [key]: {
          ...obj,
          [name]: fileName,
        },
      });
      setIsLoading(false);
    } else setIsLoading(false);
  };

  const inputFieldCollection = {
    heroSection: [
      {
        type: "text",
        name: "heading",
        defaultValue: homePageData.heroSection.heading,
        obj: homePageData.heroSection,
      },
      {
        type: "text",
        name: "description",
        defaultValue: homePageData.heroSection.description,
        obj: homePageData.heroSection,
      },
      {
        type: "file",
        name: "image",
        defaultValue: homePageData.heroSection.image,
        obj: homePageData.heroSection,
      },
      {
        type: "text",
        name: "subHeading",
        defaultValue: homePageData.heroSection.subHeading,
        obj: homePageData.heroSection,
      },
    ],
    yogaTypeShowCase: [
      {
        type: "text",
        name: "heading",
        defaultValue: homePageData.yogaTypeShowCase.heading,
        obj: homePageData.yogaTypeShowCase,
      },
      {
        type: "text",
        name: "subHeading",
        defaultValue: homePageData.yogaTypeShowCase.subHeading,
        obj: homePageData.yogaTypeShowCase,
      },
    ],
    yogaStudioShowCase: [
      {
        type: "text",
        name: "heading",
        defaultValue: homePageData.yogaStudioShowCase.heading,
        obj: homePageData.yogaStudioShowCase,
      },
      {
        type: "text",
        name: "description",
        defaultValue: homePageData.yogaStudioShowCase.description,
        obj: homePageData.yogaStudioShowCase,
      },
      {
        type: "file",
        name: "image",
        defaultValue: homePageData.yogaStudioShowCase.image,
        obj: homePageData.yogaStudioShowCase,
      },
      {
        type: "text",
        name: "address",
        defaultValue: homePageData.yogaStudioShowCase.address,
        obj: homePageData.yogaStudioShowCase,
      },
      {
        type: "text",
        name: "mapAddress",
        defaultValue: homePageData.yogaStudioShowCase.mapAddress,
        obj: homePageData.yogaStudioShowCase,
      },
    ],
    popularClassess: [
      {
        type: "text",
        name: "heading",
        defaultValue: homePageData.popularClassess.heading,
        obj: homePageData.popularClassess,
      },
      {
        type: "text",
        name: "subHeading",
        defaultValue: homePageData.popularClassess.subHeading,
        obj: homePageData.popularClassess,
      },
    ],
    yogaInstructorShowCase: [
      {
        type: "text",
        name: "heading",
        defaultValue: homePageData.yogaInstructorShowCase.heading,
        obj: homePageData.yogaInstructorShowCase,
      },
      {
        type: "text",
        name: "subHeading",
        defaultValue: homePageData.yogaInstructorShowCase.subHeading,
        obj: homePageData.yogaInstructorShowCase,
      },
    ],
    pricingShowCase: [
      {
        type: "text",
        name: "heading",
        defaultValue: homePageData.pricingShowCase.heading,
        obj: homePageData.pricingShowCase,
      },
      {
        type: "text",
        name: "subHeading",
        defaultValue: homePageData.pricingShowCase.subHeading,
        obj: homePageData.pricingShowCase,
      },
    ],
  };

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleSubmit = (data) => {
    data.e.preventDefault();
    setIsLoading(true);
    const { route, id, contentData, CBMethod } = data;
    axios
      .put(`admin/modify${route}/${id}`, { contentData })
      .then((res) => {
        const { status, message } = res.data;

        if (status) {
          dispatch(CBMethod(message));
          setIsLoading(false);
          toast("Homepage modification successful!!!");
          navigate('/admin')
        } else {
          toast(`Couldn't modify the ${route}!!!`);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error(`${route} modification error -->${err}`);
        toast("Network connection error ");
        setIsLoading(false);
      });

  };

  return (
    <>
      <main className="py-14 w-screen flex justify-center items-center">
        <div className="text-gray-600 ">
          <div className="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none">
            <div className="flex-1 mt-12 sm:max-w-lg lg:max-w-md">
              <form
                onSubmit={(e) =>
                  handleSubmit({
                    e,
                    route: "HomePage",
                    id: data._id,
                    contentData: homePageData,
                    CBMethod: modifyHomePage,

                  })
                }
              >
                {isLoading && <div> Loading...</div>}
                {Object.keys(inputFieldCollection).map((inputFieldKey) => (
                  <div
                    className={inputFieldKey}
                    key={inputFieldKey}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      //   borderBottom: "3px solid black",
                    }}
                  >
                    <h2 className="text-xl font-semibold text-center my-5">
                      {inputFieldKey.toUpperCase()}
                    </h2>
                    {inputFieldCollection[inputFieldKey].map((field, index) =>
                      field.type === "file" ? (
                        <div className="">
                          <label className="font-medium capitalize">
                            {field.name}
                          </label>
                          <div className="flex flex-col items-center gap-5">
                            {" "}
                            <input
                              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                              type={field.type}
                              key={inputFieldKey + field.name}
                              name={field.name}
                              accept=".png, .jpg, .jpeg"
                              onChange={(e) =>
                                uploadImage(
                                  e,
                                  "HomePage",
                                  field.obj,
                                  inputFieldKey
                                )
                              }

                            />
                            <img
                              className="h-[15rem] w-[15rem] rounded-md "
                              src={
                                "http://localhost:8000/homePageImages/" +
                                field.defaultValue
                              }
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <label className="font-medium capitalize">
                            {field.name}
                          </label>
                          <input
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            type={field.type}
                            key={inputFieldKey + field.name}
                            name={field.name}
                            defaultValue={field.defaultValue}
                            onChange={(e) =>
                              handleHomePageDetails(e, field.obj, inputFieldKey)
                            }
                            required
                          />
                        </>
                      )
                    )}
                  </div>
                ))}
                <button
                  className="mt-5 w-full bg-[#779393] text-white px-6 py-2 rounded-full hover:bg-[#75b9b9] transition duration-300"
                  type="submit"
                >
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

const ContactPageForm = () => {
  const { data } = useSelector((state) => state.contactpage);
  const [isLoading, setIsLoading] = useState(false);

  const [contactPageData, setContactPageData] = useState({
    _id: data._id,
    heading: data.heading,
    description: data.description,
    email: data.email,
    phno: data.phno,
    location: data.location,
  });

  const handleContactDetails = (e) => {
    const { name, value } = e.target;
    setContactPageData({
      ...contactPageData,
      [name]: value,
    });
  };
  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    data.e.preventDefault();
    setIsLoading(true);
    const { route, id, contentData, CBMethod } = data;
    axios
      .put(`admin/modify${route}/${id}`, { contentData })
      .then((res) => {
        const { status, message } = res.data;

        if (status) {
          dispatch(CBMethod(message));
          setIsLoading(false);
          toast("Contact Page modification successful!!!");
        } else {
          toast(`Couldn't modify the ${route}!!!`);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error(`${route} modification error -->${err}`);
        toast("Network connection error ");
        setIsLoading(false);
      });
  };
  return (
    <>
      {isLoading && <div> Loading...</div>}
      <main className="py-14 w-screen flex justify-center items-center">
        <div className="text-gray-600 ">
          <div className="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none">
            <div className="flex-1 mt-12 sm:max-w-lg lg:max-w-md">
              <form
                onSubmit={(e) =>
                  handleSubmit({
                    e,
                    route: "ContactPage",
                    id: data._id,
                    contentData: contactPageData,
                    CBMethod: modifyContactPage,
                  })
                }
              >
                <h2 className="text-xl font-semibold text-center">
                  Contact Section
                </h2>
                <div className="">
                  <label
                    htmlFor="heading"
                    className="font-medium capitalize ml-2 h-0"
                  >
                    Heading
                  </label>
                  <input
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    type="text"
                    name="heading"
                    required
                    onChange={handleContactDetails}
                    defaultValue={contactPageData.heading}
                  />
                </div>
                <label className="font-medium capitalize ml-2">
                  Description
                </label>
                <input
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  type="text"
                  name="description"
                  required
                  onChange={handleContactDetails}
                  defaultValue={contactPageData.description}
                />
                <label className="font-medium capitalize ml-2">Email</label>
                <input
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  type="email"
                  name="email"
                  required
                  onChange={handleContactDetails}
                  defaultValue={contactPageData.email}
                />
                <label className="font-medium capitalize ml-2">Phone no</label>
                <input
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  type="text"
                  name="phno"
                  required
                  onChange={handleContactDetails}
                  defaultValue={contactPageData.phno}
                />

                <label className="font-medium capitalize ml-2">Location</label>
                <input
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  type="text"
                  name="location"
                  required
                  onChange={handleContactDetails}
                  defaultValue={contactPageData.location}
                />
                <button
                  className="mt-5 w-full bg-[#779393] text-white px-6 py-2 rounded-full hover:bg-[#75b9b9] transition duration-300"
                  type="submit"
                >
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

const AboutPageForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.aboutpage);

  const [aboutPageData, setAboutPageData] = useState({
    _id: data._id,
    heading: data.heading,
    subHeading: data.subHeading,
    description: data.description,
    image: data.image,
  });

  const handleSubmit = (data) => {
    data.e.preventDefault();
    setIsLoading(true);
    const { route, id, contentData, CBMethod } = data;
    axios
      .put(`admin/modify${route}/${id}`, { contentData })
      .then((res) => {
        const { status, message } = res.data;

        if (status) {
          dispatch(CBMethod(message));
          setIsLoading(false);
          toast("About Page modification successful!!!");
        } else {
          toast(`Couldn't modify the ${route}!!!`);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error(`${route} modification error -->${err}`);
        toast("Network connection error ");
        setIsLoading(false);
      });
  };

  const handleAboutDetails = (e) => {
    const { name, value } = e.target;
    setAboutPageData({
      ...aboutPageData,
      [name]: value,
    });
  };

  const uploadImage = async (e) => {
    setIsLoading(true);
    const { status, fileName } = await handleImageUploading(
      e,
      "AboutPage",
      setIsLoading
    );
    const { name } = e.target;

    if (status) {
      setAboutPageData({
        ...aboutPageData,
        [name]: fileName,
      });
      setIsLoading(false);
    } else setIsLoading(false);
  };

  return (
    <>
      {isLoading && <div>Loading...</div>}
      <main className="py-14 w-screen flex justify-center items-center">
        <div className="text-gray-600 ">
          <div className="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none">
            <div className="flex-1 mt-12 sm:max-w-lg lg:max-w-md">
              <form
                onSubmit={(e) =>
                  handleSubmit({
                    e,
                    route: "AboutPage",
                    id: data._id,
                    contentData: aboutPageData,
                    CBMethod: modifyAboutPage,
                  })
                }
              >
                <h2 className="text-xl font-semibold text-center">
                  About Section
                </h2>
                <label className="font-medium capitalize ml-2">Heading</label>

                <input
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  type="text"
                  name="heading"
                  required
                  onChange={handleAboutDetails}
                  defaultValue={aboutPageData.heading}
                />
                <label className="font-medium capitalize ml-2">
                  Sub Heading
                </label>

                <input
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  type="text"
                  name="subHeading"
                  required
                  onChange={handleAboutDetails}
                  defaultValue={aboutPageData.subHeading}
                />
                <label className="font-medium capitalize ml-2">
                  Description
                </label>

                <input
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  type="text"
                  name="description"
                  required
                  onChange={handleAboutDetails}
                  defaultValue={aboutPageData.description}
                />
                <label className="font-medium capitalize ml-2">Image</label>
                <div className="flex flex-col items-center gap-5">
                  <input
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    type="file"
                    name="image"
                    accept=".png, .jpg, .jpeg"
                    onChange={uploadImage}
                    required
                  />
                  <img
                    className="h-[15rem] w-[15rem] rounded-md "
                    src={
                      "http://localhost:8000/aboutPageImages/" +
                      aboutPageData.image
                    }
                  />
                </div>
                <button
                  className="mt-5 w-full bg-[#779393] text-white px-6 py-2 rounded-full hover:bg-[#75b9b9] transition duration-300"
                  type="submit"
                >
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export const WebsiteManagementForm = () => {
  const [activeComponent, setActiveComponent] = useState('home');
  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };
  return (
    <div>
      <div className="flex w-full justify-center mt-5 gap-5">
        <button onClick={() => handleButtonClick('home')} className="block w-auto py-3 px-4 font-medium text-sm text-center text-white bg-[#779393] hover:bg-[#6ec4c4] active:bg-[#306666] active:shadow-none rounded-lg shadow">Edit Home</button>
        <button onClick={() => handleButtonClick('contact')} className="block w-auto py-3 px-4 font-medium text-sm text-center text-white bg-[#779393] hover:bg-[#6ec4c4] active:bg-[#306666] active:shadow-none rounded-lg shadow">Edit Contacts</button>
        <button onClick={() => handleButtonClick('about')} className="block w-auto py-3 px-4 font-medium text-sm text-center text-white bg-[#779393] hover:bg-[#6ec4c4] active:bg-[#306666] active:shadow-none rounded-lg shadow">Edit About</button>
        <button onClick={() => handleButtonClick('yogainstructor')} className="block w-auto py-3 px-4 font-medium text-sm text-center text-white bg-[#779393] hover:bg-[#6ec4c4] active:bg-[#306666] active:shadow-none rounded-lg shadow">Edit Yoga Instructor</button>
      </div>
      {activeComponent === 'home' && <HomePageForm />}
      {activeComponent === 'contact' && <ContactPageForm />}
      {activeComponent === 'about' && <AboutPageForm />}
      {activeComponent === 'yogainstructor' && <YogaInstructorHandler />}
    </div>
  );
};
