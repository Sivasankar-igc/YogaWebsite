import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { FaEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FiSave } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";

import axios from "axios";
import { toast } from "react-toastify";
import { modifyPage, addPage, removePage } from "../REDUX_COMPONENTS/FEATURES/pageSlice.mjs";
import { statusCode } from "../utils/statusFile.mjs";



const HandleFooter = () => {

    const { data: footerData, status: footerStatus } = useSelector(state => state.footer);
    const { data: pageData, status: pageStatus } = useSelector(state => state.page)

    const [currentLinkId, setCurrentLinkId] = useState(null);
    const [updateLink, setUpdateLink] = useState("");
    const [footerName, setFooterName] = useState("");
    const [canAddFooter, setCanAddFooter] = useState(false)

    const dispatch = useDispatch()


    const handleUpdation = (footerLabel, name) => {
        if (updateLink !== "") {
            axios.put(`admin/modifyFooter/${currentLinkId}`, { footerLabel, name, url: updateLink })
                .then(res => {
                    const { status, message } = res.data;
                    if (status) {
                        location.reload()
                        toast("Updation complete")
                        setCurrentLinkId(null)
                        setUpdateLink("")
                    } else {
                        toast("Something went wrong!!!")
                    }
                })
                .catch(err => {
                    console.error(err)
                    toast("Network connection error")
                })
        } else {
            toast("Nothing to change")
        }
    }

    const handleAdd = () => {
        axios.post("admin/addFooter", { name: footerName, url: updateLink })
            .then(res => {
                const { status, message } = res.data;
                if (status) {
                    location.reload()
                } else {
                    toast("Something went wrong!!!")
                }
            })
            .catch(err => {
                console.error(err)
                toast("Network connection error")
            })
    }

    const removeLink = (id) => {
        axios.delete(`admin/removeFooter/${id}`)
            .then(res => res.data ? location.reload() : toast("Something went wrong"))
            .catch(err => {
                console.error(err)
                toast("Network connection error")
            })
    }

    return (
        <>
            <main className="py-14 w-screen flex justify-center items-center">
                <div className="text-gray-600 ">
                    <div className="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none">
                        <div className="flex-1 mt-12 sm:max-w-lg lg:max-w-md">
                            <h1 className="text-xl font-semibold text-center my-5">
                                Footer Section
                            </h1>
                            <form >
                                {
                                    footerData.map((footer) => (
                                        <div key={footer._id} style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            //   borderBottom: "3px solid black",
                                        }}>
                                            <h2 className="text-xl font-semibold text-center my-5">{footer.footerLabel}</h2>
                                            {
                                                footer.footerLabel !== "Explore"
                                                    ? <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                        {
                                                            footer.footerLinks.map(footerLink => (
                                                                <div className="flexflex-col mb-4 ">
                                                                    <h3 className=" font-medium capitalize">{footerLink.name} &nbsp;</h3>
                                                                    {
                                                                        currentLinkId === footerLink._id
                                                                            ? <div className="flex">
                                                                                <input className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" type="text" defaultValue={footerLink.url} onChange={(e) => setUpdateLink(e.target.value)} />
                                                                                <div style={{ display: "flex" }}>
                                                                                    <button type="button" className="bg-[#779393] text-white px-4 py-1 rounded-full hover:bg-[#75b9b9] transition duration-300" onClick={() => handleUpdation(footer.footerLabel, footerLink.name)}><FiSave/></button>
                                                                                    <button type="button" className="bg-[#779393] text-white px-4 py-1 rounded-full hover:bg-[#75b9b9] transition duration-300" onClick={() => { setCurrentLinkId(null); setUpdateLink("") }}>Cancel</button>
                                                                                </div>
                                                                            </div>
                                                                            : <div className="flex gap-5 justify-center items-center">
                                                                                <input type="text" defaultValue={footerLink.url} disabled className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" />
                                                                                <button type="button" className=" text-[#779393] h-10 w-10 justify-center items-center rounded-full hover:bg-[#75b9b9] transition duration-300" onClick={() => setCurrentLinkId(footerLink._id)}><FaEdit/></button>
                                                                            </div>
                                                                    }
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                    : <div className="flex flex-col-reverse items-end">

                                                        {
                                                            canAddFooter
                                                                ? <div style={{ marginBottom: "15px", display: "flex" }}>
                                                                    <button className="bg-[#779393] text-white px-4 py-1 rounded-full hover:bg-[#75b9b9] transition duration-300" type="button" onClick={handleAdd}>Save</button>
                                                                    <button className="bg-[#779393] text-white px-4 py-1 rounded-full hover:bg-[#75b9b9] transition duration-300" type="button" onClick={() => {
                                                                        setCanAddFooter(false);
                                                                        setFooterName("");
                                                                    }}>Cancel</button>
                                                                </div>
                                                                : <div style={{ marginBottom: "15px" }}>
                                                                    <button className=" mt-6 border text-[#779393] px-4 py-1 rounded-full hover:bg-[#75b9b9] transition duration-300" type="button" onClick={() => setCanAddFooter(true)}> <IoMdAdd/> </button>
                                                                </div>
                                                        }
                                                        {
                                                            canAddFooter &&
                                                            <div style={{ marginBottom: "15px" }}>
                                                                {
                                                                    pageStatus === statusCode.IDLE
                                                                        ? <>
                                                                            <input className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" type="text" placeholder="Enter the footer name" onChange={(e) => setFooterName(e.target.value)} required />
                                                                            <select onChange={(e) => setUpdateLink(e.target.value)} required className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" type="text" placeholder="Enter the footer name">
                                                                                <option value="">--choose page--</option>
                                                                                {
                                                                                    pageData.map(page => (
                                                                                        <option value={page.pageName}>{page.pageName.toUpperCase()}</option>
                                                                                    ))
                                                                                }
                                                                            </select>
                                                                        </>
                                                                        : <p>There is no pages to add. Please add a page before creating a link</p>
                                                                }

                                                            </div>
                                                        }

                                                        {
                                                            footer.footerLinks.map(footerLink => (
                                                                footerLink._id === currentLinkId
                                                                    ? <div style={{ display: "flex" }}>
                                                                        <input className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" type="text" defaultValue={footerLink.name} onChange={(e) => setFooterName(e.target.value)} />
                                                                        <select onChange={(e) => setUpdateLink(e.target.value)} required className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" type="text" placeholder="Enter the footer name">
                                                                            <option value="">--choose page--</option>
                                                                            {
                                                                                pageData.map(page => (
                                                                                    <option value={page.pageName}>{page.pageName.toUpperCase()}</option>
                                                                                ))
                                                                            }
                                                                        </select>
                                                                        <button className="bg-[#779393] text-white px-4 py-1 rounded-full hover:bg-[#75b9b9] transition duration-300" type="button" onClick={() => handleUpdation(footer.footerLabel, footerName)}>Save</button>
                                                                        <button className="bg-[#779393] text-white px-4 py-1 rounded-full hover:bg-[#75b9b9] transition duration-300" type="button" onClick={() => {
                                                                            setUpdateLink("");
                                                                            setFooterName("")
                                                                            setCurrentLinkId(null);
                                                                        }}>Cancel</button>
                                                                    </div>
                                                                    : <div style={{ display: "flex" }}>
                                                                        <input className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" type="text" defaultValue={footerLink.name} disabled />
                                                                        <input className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" type="text" defaultValue={footerLink.url} disabled />
                                                                        <div style={{ display: "flex" }}>
                                                                            <button className=" text-[#779393] px-4 py-1 rounded-full hover:bg-[#75b9b9] transition duration-300" type="button" onClick={() => { setCurrentLinkId(footerLink._id); setUpdateLink(footerLink.url) }}><FaEdit/></button>
                                                                            <button className=" text-[#779393] px-4 py-1 rounded-full hover:bg-[#75b9b9] transition duration-300" type="button" onClick={() => removeLink(footerLink._id)}><MdDelete/></button>
                                                                        </div>
                                                                    </div>
                                                            ))
                                                        }
                                                    </div>
                                            }

                                        </div>
                                    ))
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default HandleFooter