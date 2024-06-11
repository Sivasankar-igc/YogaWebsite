import React from "react";

const Pageinfo = (props) => {
  return (
    <div
      style={{ backgroundImage: `url(${props.img})`, objectFit: "unset" }}
      className="h-[20rem]  w-full rounded-md bg-gray-100 flex flex-col items-center justify-center max-w-[80%] my-5"
    >
      {/* <img
      className="absolute"
        src="Yogini-removebg-preview.png"
        alt="Yogini"
        style={{ width: "100%", height: "100%", objectFit:'unset' }}
      /> */}
      <h1 className="text-7xl z-10 mb-3 text-center ">{props.name}</h1>
      <p className="text-[#677178]">
        <a href="/user" className="text-[#779393]">
          Home
        </a>
        {props.prevpage && (<a
          href={`/user/${props.prevpage}`}
          className="text-[#779393] capitalize"
        >
          &gt; {props.prevpage}
        </a>)}
        &gt; {props.name}
      </p>
    </div>
  );
};

export default Pageinfo;
