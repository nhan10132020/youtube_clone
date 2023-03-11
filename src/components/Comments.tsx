import React, { useEffect } from 'react'
import MyComment from './MyComment'
import { BiDislike, BiLike } from 'react-icons/bi'
import OthersComments from './OthersComments'
import { useAppDispatch, useAppSelector } from '../store/hook'
import { getCommentsFromVideo } from '../features/youtubeSlice/reducers/getCommentsFromVideo'
import { Comment } from '../Type'

const Comments = ({videoId,cout}:{videoId:string,cout:string|null}) => {
  let comments:Comment[] = useAppSelector(state => state.youtubeApp.comments)
  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(getCommentsFromVideo(videoId));
  },[])

  return (
    <div>
        <MyComment cout={cout}/>
        <div className='flex flex-col gap-4'>
            {
              comments.map((comment,index)=>(
                <OthersComments comment={comment} key={comment.authorChannelId+index}/>
              ))
            }
        </div>
    </div>
  )
}

export default Comments