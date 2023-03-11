import React, { useState } from 'react'
import LargeSideBar from './LargeSidebar'
import SmallSideBar from './SmallSideBar'
import { useAppSelector } from '../../store/hook'
const SideBar = () => {
    const open = useAppSelector(state => state.responsive.open)
  return (
   <>
     {open?(
      <LargeSideBar/>
    ):(
      <SmallSideBar/>
    )}
   </>
  )
}

export default SideBar