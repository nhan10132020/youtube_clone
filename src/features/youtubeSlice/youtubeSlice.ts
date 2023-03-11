import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HomePageVideos, initialState } from "../../Type";
import { RootState } from "../../store/app";
import {getCommentsFromVideo} from '../youtubeSlice/reducers/getCommentsFromVideo'
import { getVideoList } from "../../api/youtubeApi";
import { parseData } from "../../utils";
import { getVideoDetails } from "./reducers/getVideoDetail";
import { getRecommendedVideos } from "./reducers/getRecommendVideos";

const initialState:initialState ={
    videos:[],
    currentPlaying: null,
    searchTerms: "",
    nextPageToken: null,
    recommendedVideos: [],
    comments: []
}

export const getHomePageVideos = createAsyncThunk("youtubeApp/homPageVideos",async(isNext:boolean,{getState})=>{
    const {
        youtubeApp:{nextPageToken:nextPageTokenFromPrevState,videos},
    } = getState() as RootState
    const {items,nextPageToken}= await getVideoList(isNext,nextPageTokenFromPrevState)
    const parsedData:HomePageVideos[] = await parseData(items)
    return {parsedData : [...videos,...parsedData],nextPageToken}
})

export const getSearchPageVideos = createAsyncThunk("youtubeApp/searchPageVideos",async({isNext,query}:{isNext:boolean,query:string},{getState})=>{
    const {
        youtubeApp:{nextPageToken:nextPageTokenFromPrevState,videos},
    } = getState() as RootState
    const {items,nextPageToken}= await getVideoList(isNext,nextPageTokenFromPrevState,query)
    const parsedData:HomePageVideos[] = await parseData(items)
    return {parsedData : [...videos,...parsedData],nextPageToken}
})

const youtubeSlice = createSlice({
    name:"youtubeSlice",
    initialState,
    reducers:{
        clearVideos:(state)=>{
            state.videos = [];
            state.nextPageToken = null;
        },
        changeSearchTerm:(state,action)=>{
            state.searchTerms = action.payload
        },
        clearSearchTerm: (state)=>{
            state.searchTerms = ""
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getHomePageVideos.fulfilled,(state,action)=>{
            state.videos = action.payload.parsedData;
            state.nextPageToken = action.payload.nextPageToken
        })
        builder.addCase(getSearchPageVideos.fulfilled,(state,action)=>{
            state.videos = action.payload.parsedData;
            state.nextPageToken = action.payload.nextPageToken
        })
        builder.addCase(getVideoDetails.fulfilled, (state, action) => {
            state.currentPlaying = action.payload;
        });
        builder.addCase(getRecommendedVideos.fulfilled, (state, action) => {
            state.recommendedVideos = action.payload;
        });
        builder.addCase(getCommentsFromVideo.fulfilled, (state,action)=>{
            state.comments = action.payload;
        })
    }
})
export const {clearVideos,changeSearchTerm,clearSearchTerm} = youtubeSlice.actions
export default youtubeSlice.reducer