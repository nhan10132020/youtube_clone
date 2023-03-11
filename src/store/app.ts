import { configureStore } from "@reduxjs/toolkit";
import youtubeReducer from "../features/youtubeSlice/youtubeSlice"
import responsiveReducer from "../features/responsiveSlice/responsiveSlice"
export const store = configureStore({
    reducer:{
        youtubeApp: youtubeReducer,
        responsive : responsiveReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch