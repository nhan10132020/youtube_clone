import React from 'react'
import { AiOutlineSearch, AiOutlineClose, } from "react-icons/ai";
import { TiMicrophone } from "react-icons/ti";
import { BsYoutube, BsCameraVideo, BsBell } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoAppsSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { changeSearchTerm, clearSearchTerm} from '../features/youtubeSlice/youtubeSlice';
import { Tooltip } from 'antd';
import { openSideBar, setOpenModal } from '../features/responsiveSlice/responsiveSlice';
const Navbar = () => {
    const loacation = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const searchTerm = useAppSelector((state)=>state.youtubeApp.searchTerms)
    const handleSearch = ()=>{
        if(searchTerm) {
            navigate(`/search/${searchTerm}`);
        }
    }
    //loacation.pathname.includes("watch")
  return (
    <div className="flex justify-between items-center md:pr-14 pr-2 h-[80px] bg-[#212121] opacity-95 sticky top-0 z-50">
        <div className="flex gap-4 items-center text-2xl w-auto h-[7.5vh] pl-4">
            <div className='p-2 rounded-full hover:bg-[#3F3F3F] cursor-pointer' onClick={()=>{
               if(loacation.pathname.includes("watch")){
                dispatch(setOpenModal(true))
               }else{
                dispatch(openSideBar())
                dispatch(setOpenModal(false))
               }
            }}>
                <GiHamburgerMenu/>
            </div>
            <Link to="/" className='sx:block hidden'>
                <div className='flex gap-1 items-center justify-center '>
                    <BsYoutube className='text-3xl text-red-600'/>
                    <span className='text-xl font-medium'>Youtube</span>
                </div>
            </Link>
        </div>
        <div className='flex items-center justify-center md:gap-5 gap-1 lg:w-auto sm:w-1/2 w-1/3'>
            <form
                onSubmit={(e)=>{
                    e.preventDefault();
                    handleSearch()
                }}
            >
                <div className='flex bg-zinc-900 items-center h-10 px-4 pr-0'>
                    <div className='flex sx:gap-4 gap-0 items-center sx:pr-5 pr-0 '>
                        <div>
                            <AiOutlineSearch className='text-xl'/>
                        </div>
                        <input
                         type='text'
                         className='w-full lg:w-86 md:w-72 bg-zinc-900 focus:outline-none border-none'
                         value={searchTerm}
                         onChange={e=>dispatch(changeSearchTerm(e.target.value))}
                        />
                        <AiOutlineClose 
                         className={`text-xl cursor-pointer ${!searchTerm?"invisible":""}`}
                         onClick={()=>{
                            dispatch(clearSearchTerm())
                         }}
                        />
                    </div>
                    <Tooltip title="search" placement='bottom' color='#3F3F3F' mouseEnterDelay={0} mouseLeaveDelay={0} >
                        <button className='h-10 w-16 flex items-center justify-center bg-zinc-800'>
                            <AiOutlineSearch className="text-xl" />
                        </button>
                    </Tooltip>
                </div>
            </form>
            <Tooltip title="search with your voice" placement='bottom' color='#3F3F3F' mouseEnterDelay={0} mouseLeaveDelay={0} >
                <div className="sx:text-xl sm:text-sm p-3 bg-zinc-900 rounded-full hover:bg-[#3F3F3F] cursor-pointer">
                    <TiMicrophone />
                </div>
            </Tooltip>
        </div>
        <div className="flex md:gap-5 sm:gap-2 gap-0.5 justify-end items-center text-xl md:w-auto w-1/4">
            <Tooltip title="create" placement='bottom' color='#3F3F3F' mouseEnterDelay={0} mouseLeaveDelay={0} >
                <div className='p-2 rounded-full hover:bg-[#3F3F3F] cursor-pointer sx:text-[24px] text-sm' >
                    <BsCameraVideo />
                </div>
            </Tooltip>
            <Tooltip title="list" placement='bottom' color='#3F3F3F' mouseEnterDelay={0} mouseLeaveDelay={0} >
                <div className='p-2 rounded-full hover:bg-[#3F3F3F] cursor-pointe sx:text-[24px] text-sm '>
                    <IoAppsSharp />
                </div>
            </Tooltip>
            <Tooltip title="notifications" placement='bottom' color='#3F3F3F' mouseEnterDelay={0} mouseLeaveDelay={0} >
                <div className="relative p-2 rounded-full hover:bg-[#3F3F3F] cursor-pointe sx:text-[24px] text-sm ">
                    <BsBell />
                </div>
            </Tooltip>
            <img
                src="https://w7.pngwing.com/pngs/753/432/png-transparent-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-people-thumbnail.png"
                className="sx:w-9 sx:h-9 w-6 h-6 rounded-full cursor-pointer"
                alt="logo"
            />
        </div>
    </div>
  )
}

export default Navbar