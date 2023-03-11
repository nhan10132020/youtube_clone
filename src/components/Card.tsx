import React from "react";
import { HomePageVideos } from "../Type";
import { Link } from "react-router-dom";
import parse from 'html-dom-parser'
export default function Card({ data }: { data: HomePageVideos }) {
  return (
    <div className="2xl:w-1/6 xl:w-1/5 md:w-1/4 sm:w-1/3 sx:w-1/2 w-full h-fit flex gap-3 flex-col px-2">
      <div className="relative">
        <span className="absolute bottom-3 right-3 text-sm bg-gray-900 px-2 py-0.5 z-10">
          {data.videoDuration}
        </span>
        <Link to={`/watch/${data.videoId}`}>
          <img
            src={data.videoThumbnail}
            className="h-full w-full object-cover"
            alt="thumbnail"
          />
        </Link>
      </div>
      <div className="flex gap-2">
        <div className="min-w-fit">
          <a href="#">
            <img
              src={data.channelInfo.image}
              alt="channel"
              className="h-9 w-9 rounded-full"
            />
          </a>
        </div>
        <div>
          <h3>
            <a href="#" className="line-clamp-2">
              {parse(data.videoTitle)[0].data}
            </a>
          </h3>
          <div className="text-sm text-gray-400">
            <div>
              <a href="#" className="hover:text-white">
                {data.channelInfo.name}
              </a>
            </div>
            <div>
              <span className="after:content-['•'] after:mx-1">
                {data.videoViews} views
              </span>
              <span>{data.videoAge}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}