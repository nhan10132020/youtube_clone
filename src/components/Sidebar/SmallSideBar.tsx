import React from "react";
import { FaRegCompass } from "react-icons/fa";
import {
  MdHomeFilled,
  MdOutlineSlowMotionVideo,
  MdSubscriptions,
} from "react-icons/md";

const SmallSideBar = () => {
  const mainLinks = [
    {
      id:1,
      icon: <MdHomeFilled color="#F1F1F1" size={"24px"} />,
      name: "Home",
    },
    {
      id:2,
      icon: <FaRegCompass color="#F1F1F1" size={"24px"} />,
      name: "Explore",
    },
    {
      id:3,
      icon: <MdOutlineSlowMotionVideo color="#F1F1F1" size={"24px"} />,
      name: "Shorts",
    },
    {
      id:4,
      icon: <MdSubscriptions color="#F1F1F1" size={"24px"} />,
      name: "Subscriptions",
    },
  ];
  return (
    <div className="w-[72px] bg-[#212121] overflow-auto px-1 flex flex-col">
      {mainLinks.map((mainlink) => (
        <div className={`flex flex-col pt-4 pb-[14px] gap-1.5 items-center hover:bg-zinc-600 cursor-pointer ${mainlink.name=="Home"&& "bg-slate-600"}`} key={mainlink.id}>
          {mainlink.icon}
          <span
            className="text-[10px] text-[#F1F1F1]"
            style={{
              fontFamily: `"Roboto", sans-serif`,
            }}
          >
            {mainlink.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SmallSideBar;
