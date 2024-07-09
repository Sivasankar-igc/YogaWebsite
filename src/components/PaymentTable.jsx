import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    axios
      .get("admin/getPaymentDetails")
      .then((res) => {
        const { status, message } = res.data;
        if (status) setTableData(message);
        else toast("Something went wrong!!!");
      })
      .catch((err) => {
        toast("Network connection error");
        console.error(`Couldn't get payment table data --> ${err}`);
      });
  }, []);

  return tableData.length > 0 ? (
    <div className="mt-10 overflow-x-scroll no-scrollbar relative   w-screen h-full rounded-xl  flex justify-start lg:justify-center items-center">
      <table className="max-w-[60rem] w-4/5 rounded-md shadow-lg border border-slate-400">
        <thead>
          <tr >
            <th className="self-center border border-slate-300">Sl.No.</th>
            <th className="self-center border border-slate-300">User Name</th>
            <th className="self-center border border-slate-300">User Email</th>
            <th className="self-center border border-slate-300">Item</th>
            <th className="self-center border border-slate-300">Date Of Payment</th>
            <th className="self-center border border-slate-300">ScreenShot</th>
          </tr>
        </thead>
        <tbody >
          {tableData.map((data, index) => (
            <tr  key={data._id}>
              <td className=" self-center border border-slate-300">{index + 1}</td>
              <td className="self-center border border-slate-300">{data.username}</td>
              <td className="self-center  border border-slate-300">{data.userEmail}</td>
              <td className="self-center border border-slate-300">{data.item}</td>
              <td className="self-center border border-slate-300">{data.dateOfPayment}</td>
              <td className="self-center border border-slate-300">
                <a
                  style={{ color: "blue", textDecoration: "underline" }}
                  href={data.paymentImage}
                >
                  ScreenShot
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p style={{ textAlign: "center" }}>Loading...</p>
  );
};
