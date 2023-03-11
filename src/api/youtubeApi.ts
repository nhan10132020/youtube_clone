import axios from "axios"
import { YOUTUBE_API_URL } from "../utils/constants"

export const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY
const youtubeAPI= axios.create({
    baseURL : YOUTUBE_API_URL
})


export const getVideoList = async(isNext:boolean,nextPage:string,searchTerm:string|null=null)=>{
    const response = await axios.get(`${YOUTUBE_API_URL}/search?maxResults=20&q=${searchTerm?searchTerm:""}&key=${API_KEY}&part=snippet&type=video${isNext?`&pageToken=${nextPage}`:""}`)
    return response.data
}

export const getChannelList = async(channelIds:string[])=>{
    const response = await axios.get(
        `${YOUTUBE_API_URL}/channels?part=snippet,contentDetails&id=${channelIds.join(
          ","
        )}&key=${API_KEY}`
      );
    return response.data
}

export const getVideosDetail = async(videoIds:string[])=>{
    const response = await axios.get(
        `${YOUTUBE_API_URL}/videos?part=contentDetails,statistics&id=${videoIds.join(
          ","
        )}&key=${API_KEY}`
      );
    return response.data
}