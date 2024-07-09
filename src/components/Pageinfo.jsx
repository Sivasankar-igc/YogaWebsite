import React from "react";
import { Link } from "react-router-dom";

const Pageinfo = (props) => {
  return (
    <div
      style={{ backgroundImage: `url(${props.img})`, objectFit: "unset" }}
      className="h-[20rem]  w-full rounded-md bg-gray-100 flex flex-col items-center justify-center max-w-[80%] my-5"
    >
      <h1 className="text-7xl z-10 mb-3 text-center ">{props.name}</h1>
      <p className="text-[#677178]">
        <Link to="/user" className="text-[#779393]">
          Home
        </Link>
        {props.prevpage && (<Link
          to={`/user/${props.prevpage}`}
          className="text-[#779393] capitalize"
        >
          &gt; {props.prevpage}
        </Link>)}
        &gt; {props.name}
      </p>
    </div>
  );
};

export default Pageinfo;
