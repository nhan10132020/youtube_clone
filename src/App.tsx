import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import Watch from './pages/Watch'
import { useAppSelector } from './store/hook'
import { useDispatch } from 'react-redux'
import { openSideBar, setWindowWidth } from './features/responsiveSlice/responsiveSlice'
import ModalSideBar from './components/Sidebar/ModalSideBar'

const App = () => {
  const windowWidth = useAppSelector(state=>state.responsive.windowWidth)
  const dispatch = useDispatch()
  useEffect(()=>{
    const handleResize = ()=>{
      dispatch(setWindowWidth(window.innerWidth))
      if(windowWidth <1312){
        dispatch(openSideBar())
      }
    }
    window.addEventListener("resize",handleResize)
    return ()=> window.removeEventListener("resize",handleResize)
  },[windowWidth])
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/search/:query' element={<Search/>}/>
        <Route path='/watch/:id' element={<Watch/>}/>
      </Routes>
      <ModalSideBar/>
    </div>
  )
}

export default App