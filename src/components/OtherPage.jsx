import { useParams } from "react-router-dom"
import Pageinfo from "./Pageinfo";
import { useSelector } from "react-redux";
import { statusCode } from "../utils/statusFile.mjs";
import { useAuth } from "../security/AuthContext";

export default () => {

    const pageName = useParams().pageName;
    const { data: pageData, status: pageStatus } = useSelector(state => state.page)

    const { user } = useAuth()

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <Pageinfo name={"Explore"} prevpage={null} />
            {
                pageStatus === statusCode.IDLE
                    ? pageData.map(page => (
                        page.pageName === pageName
                        && <div className="py-4 w-[80%]">
                            <h2 className="text-2xl font-semibold mb-4">About {page.pageTitle}</h2>
                            <img src={page.pageImage} alt="" />
                            <p>{page.pageDescription}</p>
                        </div>
                    ))
                    : <p>Nothing to show here</p>
            }
        </div>
    )
}