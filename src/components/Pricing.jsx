import { useSelector } from "react-redux";
import { statusCode } from "../utils/statusFile.mjs";
import { useNavigate } from "react-router-dom";

export default () => {

    const { data: premiumData, status } = useSelector(state => state.premium)
    const {data:homepagedata} = useSelector(state=>state.homepage)
    const nav = useNavigate();


    const handleBuyNow = (item) => {
        nav(`payment/${item.premiumName}`, { state: { contentDetails: item } })
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
                                            onClick={() => handleBuyNow(item)}
                                        >
                                            Buy now
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
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
};