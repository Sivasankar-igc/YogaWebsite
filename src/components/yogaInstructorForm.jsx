import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { FaEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { addYogaInstructor, modifyYogaInstructor, removeYogaInstructor } from "../REDUX_COMPONENTS/FEATURES/yogaInstructorSlice.mjs";
import { toast } from "react-toastify";

const YogaInstructorForm = ({ handleClose, data, CBMethod }) => {

    const [instructorData, setInstructorData] = useState({
        _id: data ? data._id : "",
        instructorDetails: {
            name: data ? data.name : "",
            image: data ? data.image : "",
            description: data ? data.description : "",
        },
        socialMediaLinks: {
            twitter: data ? data.socialMediaLinks.twitter : "",
            facebook: data ? data.socialMediaLinks.facebook : "",
            instagram: data ? data.socialMediaLinks.instagram : ""
        }
    })

    const formInputFieldData = [
        { type: "text", className: "w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg", name: "name", obj: instructorData.instructorDetails, defaultValue: instructorData.instructorDetails.name, key: "instructorDetails" },
        { type: "file", className: "block w-full border shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-[#779393] file:border-0 file:mr-4 file:py-2 file:px-4", name: "image", obj: instructorData.instructorDetails, defaultValue: instructorData.instructorDetails.image, key: "instructorDetails" },
        { type: "textarea", className: "w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg", name: "description", obj: instructorData.instructorDetails, defaultValue: instructorData.instructorDetails.description, key: "instructorDetails" },
        { type: "url", className: "w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg", name: "twitter", obj: instructorData.socialMediaLinks, defaultValue: instructorData.socialMediaLinks.twitter, key: "socialMediaLinks" },
        { type: "url", className: "w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg", name: "facebook", obj: instructorData.socialMediaLinks, defaultValue: instructorData.socialMediaLinks.facebook, key: "socialMediaLinks" },
        { type: "url", className: "w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg", name: "instagram", obj: instructorData.socialMediaLinks, defaultValue: instructorData.socialMediaLinks.instagram, key: "socialMediaLinks" },

    ]


    const handleSubmit = (e) => {
        e.preventDefault();
        CBMethod(instructorData)
    }

    const handleFormUpdation = (e, obj, key) => {
        const { name, value } = e.target;
        setInstructorData({
            ...instructorData,
            [key]: {
                ...obj,
                [name]: value
            }
        })
    }

    const handleImage = (e, obj, key) => {
        const { name, files } = e.target;
        setInstructorData({
            ...instructorData,
            [key]: {
                ...obj,
                [name]: files[0].name
            }
        })
    }


useEffect(()=>{
    console.log(instructorData)
})
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                <main className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full ">
                    <div className="flex justify-end">
                        <button
                            onClick={() => { data ? handleClose(null) : handleClose(false) }}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <IoClose size={24} />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {
                            formInputFieldData.map((inputField) => (
                                <div key={inputField.name} className="mb-0">
                                    <label className="cursor-pointer" htmlFor={inputField.name}>{inputField.name.toUpperCase()}</label>
                                    {
                                        inputField.type === "file"
                                            ? <input id={inputField.name} type={inputField.type} name={inputField.name} onChange={(e) => handleImage(e, inputField.obj, inputField.key)}/>
                                            : inputField.type === "textarea"
                                                ? <input id={inputField.name} type={inputField.type} className={inputField.className} defaultValue={inputField.defaultValue} name={inputField.name} onChange={(e) => handleFormUpdation(e, inputField.obj, inputField.key)} />
                                                : <input id={inputField.name} type={inputField.type} className={inputField.className} defaultValue={inputField.defaultValue} name={inputField.name} onChange={(e) => handleFormUpdation(e, inputField.obj, inputField.key)} />
                                    }
                                </div>
                            ))
                        }
                        <button type="submit" className="w-full bg-[#779393] text-white px-6 py-2 rounded-full hover:bg-[#75b9b9] transition duration-300">
                            SUBMIT
                        </button>
                    </form>
                </main>
            </div>
        </>
    )
}

const YogaInstructorHandler = () => {

    const { data } = useSelector(state => state.homepage)
    const { data: instructorData } = useSelector(state => state.yogainstructor);
    const [showForm, setShowForm] = useState(false);
    const [editedData, setEditedData] = useState(null);
    const dispatch = useDispatch()

    const removeInstructor = (id) => {
        if (id) {
            axios.delete(`admin/removeYogaInstructor/${id}`)
                .then(res => {
                    if (res.data) {
                        dispatch(removeYogaInstructor(id))
                        toast("removed successfully!!!")
                    } else {
                        toast("something went wrong!!!")
                    }
                })
                .catch(err => {
                    console.error(`Clientside error : removing instructor --> ${err}`)
                    toast("Network connection error")
                })
        }
        dispatch(removeYogaInstructor(id))
    }

    const addInstructor = (data) => {
        if (data) {
            axios.post("admin/addYogaInstructor", {
                name: data.instructorDetails.name,
                image: data.instructorDetails.image,
                description: data.instructorDetails.description,
                socialMediaLinks: data.socialMediaLinks
            })
                .then(res => {
                    const { status, message } = res.data;
                    if (status) {
                        dispatch(addYogaInstructor(message))
                        toast("Instructor added successfully!!!")
                    } else {
                        toast("Soemthing went wrong!!!")
                    }
                })
                .catch(err => {
                    console.error(`Clientside error : adding instructor --> ${err}`)
                    toast("Network connection error!!!")
                })
            setShowForm(false)
            setEditedData(null)
        }

    };

    const editInstructor = (data) => {
        axios.put(`admin/modifyYogaInstructor/${data._id}`, {
            name: data.instructorDetails.name,
            image: data.instructorDetails.image,
            description: data.instructorDetails.description,
            socialMediaLinks: data.socialMediaLinks
        })
            .then(res => {
                const { status, message } = res.data;
                if (status) {
                    dispatch(modifyYogaInstructor(message))
                    toast("Instructor Modified successfully!!!")
                } else {
                    toast("Something went wrong!!!")
                }
            })
            .catch(err => {
                console.error(`Error while updating the content details --> ${err}`)
                toast("Network connection error!!!")
            })
        setEditedData(null)
    };

    return (
        <>
            <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">

                <div className="max-w-screen-xl mx-auto px-4 md:px-8  ">
                    <div className="max-w-full text-center ">
                        <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl ">
                            {data.yogaInstructorShowCase.heading}
                        </h3>
                        <p className="text-gray-600 mt-3 ">
                            {data.yogaInstructorShowCase.subHeading}
                        </p>
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="bg-[#779393] text-white px-6 py-2 rounded-full hover:bg-[#75b9b9]"
                            onClick={() => { setShowForm(true); setEditedData(null) }}
                        >
                            Add
                        </button>
                    </div>
                    <div className="mt-12">
                        <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                            {
                                instructorData.map((item, idx) => (
                                    <li key={item._id} className="max-w-md mx-auto mt-4 rounded-md duration-300 hover:shadow-lg">
                                        <div className="flex justify-end">
                                            <FaEdit onClick={() => { setEditedData(item); setShowForm(false) }} style={{ cursor: "pointer" }} />
                                            <MdDelete onClick={() => removeInstructor(item._id)} style={{ cursor: "pointer" }} />
                                        </div>
                                        <div className="w-full h-90 sm:h-50 md:h-90">
                                            <img
                                                src={item.image}
                                                className="w-[19rem] h-[19rem] object-cover object-center shadow-md rounded-xl"
                                                alt=""
                                            />
                                        </div>
                                        <div className="mt-4 it">
                                            <h4 className="text-lg text-gray-700 font-semibold text-center">{item.name}</h4>

                                            <div className="mt-3 flex gap-4 text-gray-400  justify-center ">
                                                <a href={item.socialMediaLinks.twitter}>
                                                    <svg className="w-5 h-5 duration-150 hover:text-gray-500" fill="currentColor" viewBox="0 0 48 48  "><g clip-path="url(#clip0_17_80)"><path fill="currentColor" d="M15.1 43.5c18.11 0 28.017-15.006 28.017-28.016 0-.422-.01-.853-.029-1.275A19.998 19.998 0 0048 9.11c-1.795.798-3.7 1.32-5.652 1.546a9.9 9.9 0 004.33-5.445 19.794 19.794 0 01-6.251 2.39 9.86 9.86 0 00-16.788 8.979A27.97 27.97 0 013.346 6.299 9.859 9.859 0 006.393 19.44a9.86 9.86 0 01-4.462-1.228v.122a9.844 9.844 0 007.901 9.656 9.788 9.788 0 01-4.442.169 9.867 9.867 0 009.195 6.843A19.75 19.75 0 010 39.078 27.937 27.937 0 0015.1 43.5z" /></g><defs><clipPath id="clip0_17_80"><path fill="currentColor" d="M0 0h48v48H0z" /></clipPath></defs></svg>
                                                </a>
                                                <a href={item.socialMediaLinks.facebook}>
                                                    <svg className="w-6 h-6 hover:text-gray-500 duration-150" fill="none" viewBox="0 0 48 48  "><g clip-path="url(#a)"><path fill="currentColor" d="M48 24C48 10.745 37.255 0 24 0S0 10.745 0 24c0 11.979 8.776 21.908 20.25 23.708v-16.77h-6.094V24h6.094v-5.288c0-6.014 3.583-9.337 9.065-9.337 2.625 0 5.372.469 5.372.469v5.906h-3.026c-2.981 0-3.911 1.85-3.911 3.75V24h6.656l-1.064 6.938H27.75v16.77C39.224 45.908 48 35.978 48 24z" /></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h48v48H0z" /></clipPath></defs></svg>
                                                </a>

                                                <a href={item.socialMediaLinks.instagram}>
                                                    <svg className="w-5 h-5 duration-150 hover:text-gray-500" fill="none" viewBox="0 0 48 48  "><g clip-path="url(#clip0_17_68)"><path fill="currentColor" d="M44.447 0H3.544C1.584 0 0 1.547 0 3.46V44.53C0 46.444 1.584 48 3.544 48h40.903C46.407 48 48 46.444 48 44.54V3.46C48 1.546 46.406 0 44.447 0zM14.24 40.903H7.116V17.991h7.125v22.912zM10.678 14.87a4.127 4.127 0 01-4.134-4.125 4.127 4.127 0 014.134-4.125 4.125 4.125 0 010 8.25zm30.225 26.034h-7.115V29.766c0-2.653-.047-6.075-3.704-6.075-3.703 0-4.265 2.896-4.265 5.887v11.325h-7.107V17.991h6.826v3.13h.093c.947-1.8 3.272-3.702 6.731-3.702 7.21 0 8.541 4.744 8.541 10.912v12.572z" /></g><defs><clipPath id="clip0_17_68"><path fill="currentColor" d="M0 0h48v48H0z" /></clipPath></defs></svg>
                                                </a>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </section>

            {
                showForm && <YogaInstructorForm handleClose={setShowForm} CBMethod={addInstructor} />
            }
            {
                editedData && <YogaInstructorForm handleClose={setEditedData} data={editedData} CBMethod={editInstructor} />
            }
        </>
    )
}

export default YogaInstructorHandler;