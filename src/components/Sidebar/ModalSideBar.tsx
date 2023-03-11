import React, { useState } from "react";
import LargeSideBar from "./LargeSidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import { BsYoutube } from "react-icons/bs";
import { useAppSelector } from "../../store/hook";
import { useDispatch } from "react-redux";
import { setOpenModal } from "../../features/responsiveSlice/responsiveSlice";

const ModalSideBar = () => {
    const loacation = useLocation()
    const openModal= useAppSelector(state => state.responsive.openModal)
    const dispatch = useDispatch()
  return (
    <>
      {openModal&& (
        <div className="w-full h-full left-0 top-0 flex fixed z-[1000]">
          <div className="h-full w-[224px] opacity-100 flex flex-col bg-[#212121] z-[2]">
            <div className="flex flex-[0_0_80px] gap-4 items-center text-2xl w-auto sx:w-1/4  pl-4">
              <div
                className="p-2 rounded-full hover:bg-[#3F3F3F] cursor-pointer"
                onClick={() => {
                  dispatch(setOpenModal(true))
                }}
              >
                <GiHamburgerMenu />
              </div>
              <Link to="/" className="block">
                <div className="flex gap-1 items-center justify-center ">
                  <BsYoutube className="text-3xl  text-red-600" />
                  <span className="text-xl font-medium">Youtube</span>
                </div>
              </Link>
            </div>
            <LargeSideBar />
          </div>
          <div className="bg-[#070707] opacity-50 absolute top-0 left-0 w-full h-full z-[1]" />
        </div>
      )}
    </>
  );
};

export default ModalSideBar;
