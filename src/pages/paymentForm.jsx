import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation, useParams } from "react-router-dom";
import axios from "axios"

const PaymentForm = () => {
    const { userData: user } = useSelector(state => state.user)
    const [phno, setPhno] = useState(user.userDetails.phno)
    const contentDetails = useLocation().state.contentDetails;
    const params = useParams().paymentDetails;

    const phnoRef = useRef()

    const datas = [
        { label: "First Name", isDisabled: true, value: user.userDetails.firstName },
        { label: "Last Name", isDisabled: true, value: user.userDetails.lastName },
        { label: "Email Id", isDisabled: true, value: user.userDetails.emailId },
        { label: "WhatsApp Number", isDisabled: false, value: user.userDetails.phno }
    ]

    const [file, setFile] = useState(null)

    const handlePayment = () => {
        const formData = new FormData()
        formData.append("file", file)

        axios.post(`user/payment/${user.userDetails.emailId}`, formData)
    }

    return (
        <>
            <section className="paymentForm">
                <div className="user-details-wrapper">
                    <header>User Details</header>
                    <div>
                        {
                            datas.map((data, index) => (
                                <div key={index}>
                                    <p>{data.label}</p>
                                    <input type="text" defaultValue={data.value} disabled={data.isDisabled} ref={phnoRef} />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="content-details-wrapper">
                    <header style={{ fontSize: "20pt" }}>Content Details</header>
                    <div>
                        <p>Content Name</p>
                        <input type="text" value={contentDetails.premiumName} />
                    </div>
                    <div>
                        <p>Total Price</p>
                        <input type="text" value={"₹" + contentDetails.premiumPrice} />
                    </div>
                    <div>
                        <img src={contentDetails.backgroundImage} alt="yogaImage.jpeg" />
                    </div>
                </div>
                <input type="file" name="" id="" accept=".png, .jpg, .jpeg" onChange={(e) => setFile(e.target.files[0])} />
                {/* <input type="image" src="qrcode.jpeg" alt="" /> */}
                <button onClick={handlePayment}>SUBMIT</button>
            </section>
        </>
    )
}

export default PaymentForm;