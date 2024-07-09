import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { FaEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { modifyPage, addPage, removePage } from "../REDUX_COMPONENTS/FEATURES/pageSlice.mjs";
import { statusCode } from "../utils/statusFile.mjs";

const ExtraPageForm = ({ handleClose, data, CBMethod }) => {

    const [pageData, setPageData] = useState({
        _id: data ? data._id : null,
        pageName: data ? data.pageName : "",
        pageTitle: data ? data.pageTitle : "",
        pageImage: data ? data.pageImage : "",
        pageDescription: data ? data.pageDescription : ""
    })

    const [isLoading, setIsLoading] = useState(false)

    const formInputFieldData = [
        { type: "text", className: "w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg", name: "pageName", defaultValue: pageData.pageName },
        { type: "text", className: "w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg", name: "pageTitle", defaultValue: pageData.pageTitle },
        { type: "file", className: "block w-full border shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-[#779393] file:border-0 file:mr-4 file:py-2 file:px-4", name: "pageImage", defaultValue: pageData.pageImage },
        { type: "textarea", className: "w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg", name: "pageDescription", defaultValue: pageData.pageDescription }
    ]


    const handleSubmit = (e) => {
        e.preventDefault();
        CBMethod(pageData)
    }

    const handleFormUpdation = (e) => {
        const { name, value } = e.target;
        setPageData({
            ...pageData,
            [name]: value
        })
    }

    const handleImage = (e) => {
        setIsLoading(true)
        const { name, files } = e.target;

        const form = new FormData();
        form.append("file", files[0]);
        form.append("upload_preset", "foja3qaf")

        axios.post("https://api.cloudinary.com/v1_1/daadcshli/image/upload", form)
            .then(res => {
                if (res.data) {
                    setPageData({
                        ...pageData,
                        [name]: res.data.url
                    })
                    toast("Image Uploaded Successfully!!!")
                    setIsLoading(false)
                } else {
                    toast("Something went wrong");
                    setIsLoading(false)
                }
            })
            .catch(err => {
                console.error(err)
                toast("Network connection error")
                setIsLoading(false)
            })
    }

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
                    <form onSubmit={(e) => { if (!isLoading) handleSubmit(e) }}>
                        {
                            formInputFieldData.map((inputField) => (
                                <div key={inputField.name} className="mb-0">
                                    <label className="cursor-pointer" htmlFor={inputField.name}>{inputField.name.toUpperCase()}</label>
                                    {
                                        inputField.type === "file"
                                            ? <input id={inputField.name} type={inputField.type} name={inputField.name} onChange={handleImage} />
                                            : inputField.type === "textarea"
                                                ? <input id={inputField.name} type={inputField.type} className={inputField.className} defaultValue={inputField.defaultValue} name={inputField.name} onChange={handleFormUpdation} />
                                                : <input id={inputField.name} type={inputField.type} className={inputField.className} defaultValue={inputField.defaultValue} name={inputField.name} onChange={handleFormUpdation} />
                                    }
                                </div>
                            ))
                        }
                        <button type="submit" className="w-full bg-[#779393] text-white px-6 py-2 rounded-full hover:bg-[#75b9b9] transition duration-300">
                            {!isLoading ? "SUBMIT" : "Loading..."}
                        </button>
                    </form>
                </main>
            </div>
        </>
    )
}


const HandlePage = () => {

    const [showForm, setShowForm] = useState(false);
    const [editedData, setEditedData] = useState(null);
    const dispatch = useDispatch()
    const { data: pageData, status: pageStatus } = useSelector(state => state.page)

    const add = (pageData) => {
        if (pageData) {
            axios.post("admin/addPage", pageData)
                .then(res => {
                    const { status, message } = res.data;
                    if (status) {
                        dispatch(addPage(message))
                        toast("Page added successfully!!!")
                    } else {
                        toast("Something went wrong!!!")
                    }
                })
                .catch(err => {
                    console.error(`adding page error --> ${err}`)
                    toast("Network connection error")
                })

            setShowForm(false)
            setEditedData(null)
        }
    }

    const remove = (pageId) => {
        if (pageId) {
            axios.delete(`admin/removePage/${pageId}`)
                .then(res => {
                    if (res.data) {
                        dispatch(removePage(pageId))
                        toast("removed successfully!!!")
                    } else {
                        toast("something went wrong!!!")
                    }
                })
                .catch(err => {
                    console.error(`Clientside error : removing page --> ${err}`)
                    toast("Network connection error")
                })
        }
    }

    const edit = (pageData) => {
        axios.put(`admin/modifyPage/${pageData._id}`, {
            pageName: pageData.pageName,
            pageTitle: pageData.pageTitle,
            pageImage: pageData.pageImage,
            pageDescription: pageData.pageDescription
        })
            .then(res => {
                const { status, message } = res.data;
                if (status) {
                    dispatch(modifyPage(message))
                    toast("Page Modified successfully!!!")
                } else {
                    toast("Something went wrong!!!")
                }
            })
            .catch(err => {
                console.error(`Error while updating the page details --> ${err}`)
                toast("Network connection error!!!")
            })
        setEditedData(null)
    }

    return (
        <>
            <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">

                <div className="max-w-screen-xl mx-auto px-4 md:px-8  ">
                    <div className="max-w-full text-center ">
                        <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl ">
                            Extra Pages
                        </h3>
                        <p className="text-gray-600 mt-3 ">
                            Create Your Pages
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

                    {
                        pageStatus === statusCode.IDLE
                            ? <div className="mt-12">
                                <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                                    {
                                        pageData.map((item, idx) => (
                                            <li key={item._id} className="max-w-md mx-auto mt-4 rounded-md duration-300 hover:shadow-lg">
                                                <div className="flex justify-end">
                                                    <FaEdit onClick={() => { setEditedData(item); setShowForm(false) }} style={{ cursor: "pointer" }} />
                                                    <MdDelete onClick={() => remove(item._id)} style={{ cursor: "pointer" }} />
                                                </div>
                                                <div className="w-full h-90 sm:h-50 md:h-90">
                                                    <img
                                                        src={item.pageImage}
                                                        className="w-[19rem] h-[19rem] object-cover object-center shadow-md rounded-xl"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="mt-4 it">
                                                    <h4 className="text-lg text-gray-700 font-semibold text-center">{item.pageName}</h4>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            : <p>Nothing to show here</p>
                    }
                </div>
            </section>

            {
                showForm && <ExtraPageForm handleClose={setShowForm} CBMethod={add} />
            }
            {
                editedData && <ExtraPageForm handleClose={setEditedData} data={editedData} CBMethod={edit} />
            }
        </>
    )
}

export default HandlePage