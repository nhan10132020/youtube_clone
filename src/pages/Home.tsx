import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar/LargeSidebar";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { clearVideos, getHomePageVideos } from "../features/youtubeSlice/youtubeSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { HomePageVideos } from "../Type";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import SideBar from "../components/Sidebar/Sidebar";

const Home = () => {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.videos);
  useEffect(() => {
    dispatch(getHomePageVideos(false));
    return ()=>{
      dispatch(clearVideos());
    }
  }, []);

  return (
    <div className="max-h-screen overflow-hidden">
      <div>
        <Navbar />
      </div>

      <div className="flex " style={{
        height: `calc(100vh - 80px)`
      }}>
        <SideBar/>
        {videos.length ? (
          <div className="flex-1 pb-30">
            <InfiniteScroll
              dataLength={videos.length}
              next={() => dispatch(getHomePageVideos(true))}
              hasMore={videos.length < 40}
              loader={<Spinner />}
              height={"calc(100vh - 90px)"}
            >
              <div className="flex flex-wrap gap-y-14 p-8 md:max-w-[2256px] mx-auto ">
                {videos.map((item: HomePageVideos, index) => {
                  return <Card data={item} key={`item.videoId${index}`} />;
                })}
              </div>
            </InfiniteScroll>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Home;
