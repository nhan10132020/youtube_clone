import React, { useState } from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import { Comment } from "../Type";
import { AiFillCaretDown } from "react-icons/ai";

const OthersComments = ({ comment }: {comment:Comment}) => {
  
  const [openComment, setOpenComment] = useState<boolean>(false);
  return (
    <div className="flex gap-4">
      <div>
        <div className="w-[40px] h-[40px]">
          <img
            src={comment.authorProfileImageUrl? comment.authorProfileImageUrl: "https://w7.pngwing.com/pngs/753/432/png-transparent-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-people-thumbnail.png"}
            alt="avatar"
            className="w-full aspect-square rounded-full"
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col pr-8 gap-1">
        <div className="flex items-end gap-1">
          <h2 className="text-sm font-[600]">{comment.authorDisplayName}</h2>
          <span className="text-[12px] text-[#AAAAAA]">
            {comment.publishedAt}
          </span>
        </div>
        <div>
          <h2
            className="text-sm  whitespace-pre-wrap"
            style={{
              fontFamily: `"Roboto", sans-serif`,
            }}
          >
            {comment.textOriginal}
          </h2>
        </div>
        <div className="flex mt-[1px] items-center ml-[-5px]">
          <div className="w-[32px] h-[32px] hover:bg-[#3F3F3F] rounded-full flex items-center justify-center">
            <BiLike size={"20px"} />
          </div>
          <span className="text-[12px] text-[#AAAAAA]">
            {comment.likeCount}
          </span>
          <div className="w-[32px] h-[32px] hover:bg-[#3F3F3F] rounded-full flex items-center justify-center ml-[5px]">
            <BiDislike size={"20px"} />
          </div>
          <h3 className="font-[500] text-[12px] ml-6">Reply</h3>
        </div>
        {comment.replies && comment.totalReplyCount && (
          <div className="">
            <div className="cursor-pointer inline-flex items-center gap-2 text-[#3DA6FF] rounded-3xl px-4 ml-[-10px] py-2 w-fit hover:bg-[#263850]" onClick={()=>setOpenComment(!openComment)}>
              <AiFillCaretDown size={"16px"} className="" />
              <div>
                <h3 className="text-sm font-[500]">
                  <span className="mr-[2px]">{comment.totalReplyCount}</span>{" "}
                  Reply
                </h3>
              </div>
            </div>
            {openComment && 
              comment.replies.map((item:any,index) => {
                return <div className="" key={index}>
                  <div className="flex gap-4">
                    <div>
                      <div className="w-[40px] h-[40px]">
                        <img
                          src={item.authorProfileImageUrl? item.authorProfileImageUrl: "https://w7.pngwing.com/pngs/753/432/png-transparent-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-people-thumbnail.png"}
                          alt="avatar"
                          className="w-full aspect-square rounded-full"
                        />
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col pr-8 gap-1">
                      <div className="flex items-end gap-1">
                        <h2 className="text-sm font-[600]">
                          {item.authorDisplayName}
                        </h2>
                        <span className="text-[12px] text-[#AAAAAA]">
                          {item.publishedAt}
                        </span>
                      </div>
                      <div>
                        <h2
                          className="text-sm  whitespace-pre-wrap"
                          style={{
                            fontFamily: `"Roboto", sans-serif`,
                          }}
                        >
                          {item.textOriginal}
                        </h2>
                      </div>
                      <div className="flex mt-[1px] items-center ml-[-5px]">
                        <div className="w-[32px] h-[32px] hover:bg-[#3F3F3F] rounded-full flex items-center justify-center">
                          <BiLike size={"20px"} />
                        </div>
                        <span className="text-[12px] text-[#AAAAAA]">
                          {item.likeCount}
                        </span>
                        <div className="w-[32px] h-[32px] hover:bg-[#3F3F3F] rounded-full flex items-center justify-center ml-[5px]">
                          <BiDislike size={"20px"} />
                        </div>
                        <h3 className="font-[500] text-[12px] ml-6">Reply</h3>
                      </div>
                    </div>
                  </div>
                </div>
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OthersComments;
