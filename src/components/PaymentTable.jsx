import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

export default () => {
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        axios.get("admin/getPaymentDetails")
            .then((res) => {
                const { status, message } = res.data;
                if (status) setTableData(message)
                else toast("Something went wrong!!!")
            })
            .catch(err => {
                toast("Network connection error")
                console.error(`Couldn't get payment table data --> ${err}`)
            })
    }, [])

    return (
        tableData.length > 0
            ? <table>
                <thead>
                    <tr>
                        <th>Sl.No.</th>
                        <th>User Name</th>
                        <th>User Email</th>
                        <th>Item</th>
                        <th>Date Of Payment</th>
                        <th>ScreenShot</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tableData.map((data, index) => (
                            <tr key={data._id}>
                                <td>{index + 1}</td>
                                <td>{data.username}</td>
                                <td>{data.userEmail}</td>
                                <td>{data.item}</td>
                                <td>{data.dateOfPayment}</td>
                                <td><a style={{color:"blue", textDecoration:"underline"}} href={data.paymentImage}>ScreenShot</a></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            : <p style={{ textAlign: "center" }}>Loading...</p>
    )
}