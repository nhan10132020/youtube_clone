import { createAsyncThunk } from "@reduxjs/toolkit";
import { YOUTUBE_API_URL } from "../../../utils/constants";
import { API_KEY } from "../../../api/youtubeApi";
import axios from "axios";
import { convertRawViewstoString, parseData, timeSince } from "../../../utils";
import { Comment } from "../../../Type";

export const getCommentsFromVideo = createAsyncThunk("youtubeApp/comments", async (videoId:string) => {
    const { data: { items } } = await axios.get(`${YOUTUBE_API_URL}/commentThreads?key=${API_KEY}&part=snippet&part=replies&videoId=${videoId}`)
    const parsedData: Comment[] = parseAllComments(items)
    return parsedData;
})


const parseAllComments = (comment: any) => {
    let parseData:Comment[] = [];
    comment.forEach(
        (
        element: 
            { 
              id: string; 
              snippet: {
                topLevelComment:{
                    snippet:{
                        textOriginal: string; 
                        authorDisplayName: string; 
                        authorProfileImageUrl: string;
                        authorChannelUrl: string; 
                        authorChannelId: { value: string; };
                        likeCount: number; 
                        publishedAt: Date;  
                    },
                },
                totalReplyCount: number; 
              },
                replies: null|{
                    comments:{
                        snippet:{
                            textOriginal: string; 
                            authorDisplayName: string; 
                            authorProfileImageUrl: string;
                            authorChannelUrl: string; 
                            authorChannelId: { value: string; };
                            likeCount: number; 
                            publishedAt: Date;  
                        },
                    }[]
                }
            }
        ) => {
           var rep: { textOriginal: string; authorDisplayName: string; authorProfileImageUrl: string; authorChannelUrl: string; authorChannelId: string; likeCount: string; publishedAt: string; }[]|null = [];
           if(element.replies){
                element.replies.comments.map(comment=>{
                    rep.push({
                        textOriginal: comment.snippet.textOriginal,
                        authorDisplayName: comment.snippet.authorDisplayName,
                        authorProfileImageUrl: comment.snippet.authorProfileImageUrl,
                        authorChannelUrl: comment.snippet.authorChannelUrl,
                        authorChannelId: comment.snippet.authorChannelId.value,
                        likeCount: convertRawViewstoString(String(comment.snippet.likeCount)),
                        publishedAt: timeSince(new Date(comment.snippet.publishedAt)),
                    })
                })
           }else{
            rep= null
           }

        parseData.push({
            videoId: element.id,
            textOriginal: element.snippet.topLevelComment.snippet.textOriginal,
            authorDisplayName: element.snippet.topLevelComment.snippet.authorDisplayName,
            authorProfileImageUrl: element.snippet.topLevelComment.snippet.authorProfileImageUrl,
            authorChannelUrl: element.snippet.topLevelComment.snippet.authorChannelUrl,
            authorChannelId: element.snippet.topLevelComment.snippet.authorChannelId.value,
            likeCount: convertRawViewstoString(String(element.snippet.topLevelComment.snippet.likeCount)),
            publishedAt: timeSince(new Date(element.snippet.topLevelComment.snippet.publishedAt)),
            totalReplyCount: convertRawViewstoString(String(element.snippet.totalReplyCount)),
            replies:rep
        })

    });
    return parseData;
}