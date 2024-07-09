import { useSelector, useDispatch } from "react-redux";
import { statusCode } from "../utils/statusFile.mjs";
import { useState, useRef } from "react";
import { toast } from "react-toastify"
import axios from "axios"
import { modifyPremium } from "../REDUX_COMPONENTS/FEATURES/premiumSlice.mjs";

const AddVideo = ({ forClose, premium }) => {
    const modelref = useRef();
    const closeModel = (e) => {
        if (modelref.current === e.target) {
            forClose();
        }
    };

    const dispatch = useDispatch();

    const [premiumName, setPremiumName] = useState(premium ? premium.premiumName : "")
    const [premiumPrice, setPremiumPrice] = useState(premium ? premium.premiumPrice : "")
    const [point1, setPoint1] = useState(premium ? premium.premiumFeatures[0] : "")
    const [point2, setPoint2] = useState(premium ? premium.premiumFeatures[1] : "")
    const [point4, setPoint4] = useState(premium ? premium.premiumFeatures[2] : "")
    const [point3, setPoint3] = useState(premium ? premium.premiumFeatures[3] : "")

    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (e) => {
        setIsLoading(true)
        e.preventDefault();
        axios.put("admin/modifyPremium", {
            oldPremiumName: premium.premiumName,
            updatedPremiumName: premiumName,
            premiumPrice: Number(premiumPrice),
            premiumFeatures: [point1, point2, point3, point4]
        })
            .then(res => {
                if (res.data) {
                    dispatch(modifyPremium({ _id: premium._id, premiumName, premiumPrice, featuredItems: [point1, point2, point3, point4] }))
                    setIsLoading(false)
                    toast("Premium updated successfully!!!")
                } else {
                    toast("Something went wrong!!!")
                    setIsLoading(false)
                }
            })
            .catch(err => {
                console.error(err)
                toast("Network connection error!!!")
                setIsLoading(false)
            })
    };

    return (
        <div
            ref={modelref}
            onClick={closeModel}
            className="fixed  inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center "
        >
            <form
                onSubmit={(e) => {
                    if (!isLoading) handleSubmit(e)
                }}
                className="lg:top-[8rem] top-[5rem]   fixed lg:w-[30rem] py-6 rounded-lg space-y-5 bg-white max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8 md:w-[20rem]"
            >
                <div>
                    <label className="font-medium">Premium Name</label>
                    <input
                        onChange={(e) => setPremiumName(e.target.value)}
                        defaultValue={premiumName}
                        type="text"
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                </div>
                <div>
                    <label className="font-medium">Premium Price</label>
                    <input
                        onChange={(e) => setPremiumPrice(e.target.value)}
                        defaultValue={premiumPrice}
                        type="text"
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                </div>
                <div>
                    <label className="font-medium">Featured Points</label>
                    <input
                        onChange={(e) => setPoint1(e.target.value)}
                        defaultValue={point1}
                        type="text"
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                    <input
                        onChange={(e) => setPoint2(e.target.value)}
                        defaultValue={point2}
                        type="text"
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                    <input
                        onChange={(e) => setPoint3(e.target.value)}
                        defaultValue={point3}
                        type="text"
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                    <input
                        onChange={(e) => setPoint4(e.target.value)}
                        defaultValue={point4}
                        type="text"
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#779393] text-white px-6 py-2 rounded-full hover:bg-[#75b9b9] transition duration-300
                                  "
                >
                    {
                        premium
                            ? isLoading
                                ? "Loading..."
                                : "Edit"
                            : isLoading
                                ? "Loading..."
                                : "Add"
                    }
                </button>
            </form>
        </div>
    );
};

const HandlePremium = () => {
    const { data: premiumData, status } = useSelector(state => state.premium)
    const { data: homepagedata } = useSelector(state => state.homepage)

    const [showModal, setShowModal] = useState(false);
    const [currentPremium, setCurrentPremium] = useState(null);

    const handleEdit = (item) => {
        setCurrentPremium(item);
        setShowModal(true);
    }

    if (status === statusCode.IDLE) {
        return (
            <section className='py-14'>
                <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                    <div className='relative max-w-full text-center mx-auto '>
                        <h3 className='text-gray-800 text-3xl font-semibold sm:text-4xl'>
                            {homepagedata.pricingShowCase.heading}
                        </h3>
                        <div className='mt-3 max-w-full'>
                            <p>
                                {homepagedata.pricingShowCase.subHeading}
                            </p>
                        </div>
                    </div>
                    <div className='mt-16 space-y-6 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3'>
                        {
                            premiumData.map((item, idx) => (
                                <div style={{ backgroundColor: item.col }} key={item._id} className='relative flex-1 flex items-stretch flex-col p-8 rounded-xl border-2'>
                                    <div>
                                        <span className='text-[#779393]'>
                                            {item.premiumName}
                                        </span>
                                        <div className='mt-4 text-gray-800 text-3xl font-semibold'>
                                            ₹{item.premiumPrice} <span className="text-xl text-gray-600 font-normal"></span>
                                        </div>
                                    </div>
                                    <ul className='py-8 space-y-3'>
                                        {
                                            item.premiumFeatures.map((featureItem, idx) => (
                                                <li key={idx} className='flex  gap-5'>
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        className='h-5 w-5 text-indigo-600'
                                                        viewBox='0 0 20 20'
                                                        fill='currentColor'>
                                                        <path
                                                            fill-rule='evenodd'
                                                            d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                                            clip-rule='evenodd'></path>
                                                    </svg>
                                                    {featureItem}
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    <div className="flex-1 flex items-center justify-center">
                                        <button className='bg-[#779393] text-white px-6 py-2 rounded-full hover:bg-[#75b9b9] transition duration-300'
                                            onClick={() => handleEdit(item)}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                {showModal && (
                    <AddVideo forClose={() => setShowModal(false)} premium={currentPremium} />
                )}
            </section>
        );
    }
    else {
        return (
            <>
                <p color="red">NOTHING TO SHOW HERE</p>
            </>
        )
    }
}

export default HandlePremium;