import React from "react";
import { HomePageVideos } from "../Type";
import { Link } from "react-router-dom";

export default function SearchCard({ data }: { data: HomePageVideos }) {
  return (
    <div className="flex sm:flex-row flex-col gap-3">
      <div className="relative md:w-1/3 sm:w-1/2 w-full aspect-video">
        <span className="absolute bottom-3 right-3 text-sm bg-gray-900 px-2 py-0.5 z-10">
          {data.videoDuration}
        </span>
        <Link to={`/watch/${data.videoId}`}>
          <img
            src={data.videoThumbnail}
            className="w-full h-full "
            alt="thumbnail"
          />
        </Link>
      </div>
      <div className="flex md:w-2/3 sm:w-1/2 w-full gap-1 flex-col">
        <h3 className="">
          <a href="#" className="line-clamp-2">
            {data.videoTitle}
          </a>
        </h3>
        <div className="flex flex-row-reverse	items-center justify-end gap-3 sm:flex-col sm:gap-1 sm:items-start ">
          <div className="text-xs text-grap-400">
            <div>
              <div>
                <span className="after:content-['•'] after:mx-1">
                  {data.videoViews} views
                </span>
                <span>{data.videoAge}</span>
              </div>
            </div>
          </div>
          <div className=" my-2">
            <a href="#" className="flex items-center gap-2 text-xs text-gray-400">
              <img
                src={data.channelInfo.image}
                alt="channel"
                className="h-9 w-9 rounded-full"
              />
              <span>{data.channelInfo.name}</span>
            </a>
          </div>
        </div>
        <div className="line-clamp-2 text-sm text-gray-400">
          <p className="sm:block hidden">{data.videoDescription}</p>
        </div>
      </div>
    </div>
  );
}