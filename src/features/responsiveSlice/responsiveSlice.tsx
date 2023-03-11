import { createSlice } from "@reduxjs/toolkit"
import { useLocation } from "react-router-dom"

const initialState:{
    open:boolean,
    openModal:boolean,
    windowWidth: number
} = {
    open:window.innerWidth<1312?false:true,
    openModal:false,
    windowWidth: window.innerWidth
}

const responsiveSlice = createSlice({
    name:"responsiveSlice",
    initialState,
    reducers:{
        openSideBar(state){
            if(state.windowWidth < 1312){
                state.open = false
            }
            else {
                state.open =!state.open;
            }
        },
        setOpenModal(state,action){
            if(state.windowWidth <1312){
                state.openModal = !state.openModal
            }else if(action.payload){
                state.openModal = !state.openModal
            }
        },
        setWindowWidth(state,action){
            state.windowWidth = action.payload
        }
    }
})

export const {openSideBar,setWindowWidth,setOpenModal} = responsiveSlice.actions
export default responsiveSlice.reducer 