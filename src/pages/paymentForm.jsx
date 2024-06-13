import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

const PaymentForm = () => {
    const { userData: user } = useSelector(state => state.user);
    const [phno, setPhno] = useState(user.userDetails.phno);
    const contentDetails = useLocation().state.contentDetails;
    const params = useParams().paymentDetails;

    const phnoRef = useRef();

    const datas = [
        { label: "First Name", isDisabled: true, value: user.userDetails.firstName },
        { label: "Last Name", isDisabled: true, value: user.userDetails.lastName },
        { label: "Email Id", isDisabled: true, value: user.userDetails.emailId },
        { label: "WhatsApp Number", isDisabled: false, value: user.userDetails.phno }
    ];

    const [file, setFile] = useState(null);

    const handlePayment = () => {
        const formData = new FormData();
        formData.append("file", file);

        axios.post(`user/payment/${user.userDetails.emailId}`, formData);
    };

    return (
        <>
            <section className="paymentForm p-8 bg-gray-100 rounded-lg shadow-lg">
                <div className="user-details-wrapper mb-8">
                    <header className="text-2xl font-semibold mb-4">User Details</header>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {datas.map((data, index) => (
                            <div key={index} className="flex flex-col">
                                <label className="mb-2 font-medium">{data.label}</label>
                                <input
                                    type="text"
                                    defaultValue={data.value}
                                    disabled={data.isDisabled}
                                    className={`p - 2 border rounded ${data.isDisabled ? 'bg-gray-200' : 'bg-white'}`}
                                ref={phnoRef}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="content-details-wrapper mb-8">
                    <header className="text-2xl font-semibold mb-4">Content Details</header>
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-medium">Content Name</label>
                        <input
                            type="text"
                            value={contentDetails.premiumName}
                            className="p-2 border rounded bg-gray-200"
                            disabled
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-medium">Total Price</label>
                        <input
                            type="text"
                            value={`₹${contentDetails.premiumPrice}`}
                        className="p-2 border rounded bg-gray-200"
                        disabled
                        />
                    </div>
                    <div className="mb-4">
                        <img
                            src={contentDetails.backgroundImage}
                            alt="Content"
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium">Upload File</label>
                    <input
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="p-2 border rounded"
                    />
                </div>
                <button
                    onClick={handlePayment}
                    // className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    className="w-full bg-[#779393] text-white px-6 py-2 rounded-full hover:bg-[#75b9b9] transition duration-300">

                    SUBMIT
                </button>
            </section>
        </>
    );
};

export default PaymentForm;