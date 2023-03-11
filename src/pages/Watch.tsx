import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { getVideoDetails } from "../features/youtubeSlice/reducers/getVideoDetail";
import { getRecommendedVideos } from "../features/youtubeSlice/reducers/getRecommendVideos";
import Navbar from "../components/Navbar";
import { BiLike, BiDislike } from "react-icons/bi";
import { HiScissors } from "react-icons/hi";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { FaShare } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import WatchCard from "../components/WatchCard";
import Comments from "../components/Comments";
import { CurrentPlaying } from "../Type";
const Watch = () => {
  const [showMoreStatus, setShowMoreStatus] = useState<boolean>(false);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentPlaying: CurrentPlaying = useAppSelector(
    (state) => state.youtubeApp.currentPlaying
  );
  const recommendedVideos = useAppSelector(
    (state) => state.youtubeApp.recommendedVideos
  );
  useEffect(() => {
    if (id) {
      dispatch(getVideoDetails(id));
      setShowMoreStatus(false);
    } else {
      navigate("/");
    }
  }, [id, navigate, dispatch]);

  useEffect(() => {
    if (currentPlaying && id) dispatch(getRecommendedVideos(id));
  }, [currentPlaying, dispatch, id]);

  return (
    <>
      {currentPlaying && currentPlaying?.videoId === id && (
        <div className="max-h-screen overflow-hidden">
          <div>
            <Navbar />
          </div>
          <div
            className="flex w-full"
            style={{
              height: `calc(100vh - 80px)`,
            }}
          >
            <div className="flex flex-1 lg:justify-center mt-[24px] gap-x-5 md:mx-7 md:px-20 sx:px-16 sx:ml-0 ml-2 w-full overflow-auto ">
              <div style={{ maxWidth: "1280px" }}>
                <div className="max-w-[1280px] aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                  <div className="mt-5">
                    <p className="text-xl">{currentPlaying.videoTitle}</p>
                    <div className="flex flex-wrap gap-y-2 justify-between mt-1">
                      <div className="text-sm text-gray-400">
                        <span className="after:content-['•'] after:mx-1">
                          {currentPlaying.videoViews} views
                        </span>
                        <span> {currentPlaying.videoAge} ago</span>
                      </div>
                      <div className="flex items-center sx:gap-4 gap-2 uppercase">
                        <div className="flex items-center gap-1 cursor-pointer">
                          <BiLike className="sx:text-xl text-sm" />
                          <strong className="text-sm">
                            {currentPlaying.videoLikes}
                          </strong>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <BiDislike className="sx:text-xl text-sm" />
                          <strong className="text-sm">dislike</strong>
                        </div>
                        <div className="items-center gap-1 cursor-pointer break:flex hidden">
                          <FaShare className="text-xl" />
                          <strong>share</strong>
                        </div>
                        <div className="items-center gap-1 cursor-pointer break:flex hidden">
                          <HiScissors className="text-xl" />
                          <strong>clip</strong>
                        </div>
                        <div className="items-center gap-1 cursor-pointer break:flex hidden">
                          <MdOutlinePlaylistAdd className="text-xl" />
                          <strong>save</strong>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <BsThreeDots className="text-xl" />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 flex-col border-solid border-gray-400 border-2 my-5 pb-3 border-l-transparent border-r-transparent">
                      <div className="flex items-center gap-5 mr-5 mt-4">
                        <div className="h-12 w-12 flex items-center">
                          <img
                            src={currentPlaying.channelInfo.image}
                            alt=""
                            className="rounded-full aspect-square cursor-pointer"
                          />
                        </div>
                        <div className="w-5/6">
                          <h5 className="text-sm cursor-pointer">
                            <strong>{currentPlaying.channelInfo.name}</strong>
                          </h5>
                          <h6 className="text-gray-400 text-xs">
                            {currentPlaying.channelInfo.subscribers} subscribers
                          </h6>
                        </div>
                        <div>
                          <button className="uppercase bg-red-600 rounded-sm p-2 text-sm tracking-wider">
                            subscribe
                          </button>
                        </div>
                      </div>
                      <div
                        className={`${
                          !showMoreStatus ? "max-h-16 overflow-hidden" : ""
                        } text-sm w-11/12`}
                      >
                        <pre
                          style={{
                            fontFamily: `"Roboto", sans-serif`,
                          }}
                          className="whitespace-pre-wrap"
                        >
                          {currentPlaying.videoDescription}
                        </pre>
                      </div>
                      <div>
                        <button
                          className="uppercase text-sm cursor-pointer"
                          onClick={() => setShowMoreStatus(!showMoreStatus)}
                        >
                          Show {showMoreStatus ? "less" : "more"}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="lg:mr-24 md:mr-16 min-w-[300px] md:hidden flex-col gap-3 flex">
                    {getRecommendedVideos.length &&
                      recommendedVideos.map((item) => {
                        return <WatchCard data={item} key={item.videoId} />;
                      })}
                  </div>
                  <Comments
                    videoId={id}
                    cout={
                      currentPlaying.commentCount
                        ? currentPlaying.commentCount
                        : null
                    }
                  />
                </div>
              </div>
              <div className="lg:mr-24 md:mr-16 min-w-[300px] md:flex flex-col gap-3 hidden">
                {getRecommendedVideos.length &&
                  recommendedVideos.map((item) => {
                    return <WatchCard data={item} key={item.videoId} />;
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Watch;
