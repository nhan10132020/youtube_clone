import React, { useState } from "react";
import { MdInsertEmoticon, MdOutlineSort } from "react-icons/md";

const MyComment = ({cout}:{cout:string|null}) => {
    const [openInput,setOpenInput] = useState<boolean>(false)
    const [value,setValue] = useState<string>("")
    const handleClickInput = ()=>{
        setOpenInput(true);
    }
  return (
    <div className="mt-6 mb-8 flex flex-col">
      <div className="mb-6 flex items-center">
        <h2
          className="mr-8 text-md"
          style={{
            fontFamily: `"Roboto", sans-serif`,
          }}
        >
          {cout} Comments
        </h2>
        <div className="flex items-center">
            <MdOutlineSort size={"24px"} className="mr-2 cursor-pointer"/>
            <h2 className="text-sm">Sort By</h2>
        </div>
      </div>
      <div className="flex gap-8 mr-4">
          <div className="w-[40px] h-[40px]">
            <img src="https://w7.pngwing.com/pngs/753/432/png-transparent-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-people-thumbnail.png" alt="avatar" className="w-full aspect-square rounded-full"/>
          </div>
          <div className="flex-1">
            <div className="pb-2">
                <input
                className="w-full bg-transparent border-b border-b-[#3F3F3F] pb-[4px] focus:outline-none placeholder:text-sm placeholder:text-[#AAAAAA] focus:border-b-white" 
                placeholder="Add a comment ..."
                onClick={handleClickInput}
                value={value}
                onChange={(e)=>setValue(e.target.value)}
                />
            </div>
            {openInput && (
                <div className="flex justify-between">
                    <div className="h-[40px] w-[40px] flex items-center justify-center hover:bg-[#3F3F3F] rounded-full ml-[-10px] ">
                         <MdInsertEmoticon size={"24px"} className="cursor-pointer"/>
                    </div>
                    <div className="flex gap-2">
                        <div className="text-sm flex items-center justify-center px-4 cursor-pointer">
                            <h1 className=" font-[600]">Cancel</h1>
                        </div>
                        <div className={`text-sm flex items-center justify-center px-4 rounded-3xl ${value?"bg-[#3DA6FF] text-black cursor-pointer":"bg-[#282828] text-[#717171]"}`}>
                            <h1 className="font-[600]">Comment</h1>
                        </div>
                    </div>
                </div>
            )}
          </div>
      </div>
    </div>
  );
};

export default MyComment;
