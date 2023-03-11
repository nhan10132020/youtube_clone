import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar/LargeSidebar";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { clearVideos, getHomePageVideos, getSearchPageVideos } from "../features/youtubeSlice/youtubeSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { HomePageVideos } from "../Type";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import SearchCard from "../components/SearchCard";
import SideBar from "../components/Sidebar/Sidebar";

const Search = () => {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.videos);
  const {query} = useParams();
  const navigate = useNavigate()

  useEffect(()=>{
    
    dispatch(getSearchPageVideos({isNext:false,query}))
    return ()=>{
      dispatch(clearVideos())
    }
  },[dispatch,navigate,query])

  return (
    <div className="max-h-screen overflow-hidden">
      <div className="" >
        <Navbar />
      </div>
      <div className="flex " style={{
        height: `calc(100vh - 80px)`
      }}>
        <SideBar/>
        {videos.length ? (
          <div className="flex-1 pl-8 pr-2">
            <InfiniteScroll
              dataLength={videos.length}
              next={() => dispatch(getHomePageVideos(true))}
              hasMore={videos.length < 40}
              loader={<Spinner />}
              height={"calc(100vh - 90px)"}
            >
              <div className="my-5 flex flex-col gap-5 max-w-[1280px] mx-auto">
                {videos.map((item: HomePageVideos, index) => {
                  return <SearchCard data={item} key={`item.videoId${index}`} />;
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

export default Search;
