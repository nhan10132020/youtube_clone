export interface initialState{
    videos: HomePageVideos[];
    currentPlaying: CurrentPlaying | null;
    searchTerms:string;
    nextPageToken:string|null;
    recommendedVideos:RecommendedVideos[];
    comments : Comment[]
} 

export interface HomePageVideos {
    videoId: string;
    videoTitle: string;
    videoDescription: string;
    videoLink: string;
  
    videoThumbnail: string;
    videoDuration: string;
    videoViews: string;
    videoAge: string;
    channelInfo: {
      id: string;
      image: string;
      name: string;
    };
  }
  
  export interface CurrentPlaying {
    videoId: string;
    videoTitle: string;
    videoDescription: string;
    videoViews: string;
    videoLikes: string;
    videoAge: string;
    commentCount:string|null;
    channelInfo: {
      id: string;
      image: string;
      name: string;
      subscribers: string;
    };
  }
  
  export interface RecommendedVideos {
    videoId: string;
    videoTitle: string;
    videoThumbnail: string;
    videoDuration: string;
    videoViews: string;
    videoAge: string;
    channelInfo: {
      id: string;
      name: string;
    };
  }
  
  export interface Item {
    snippet: {
      title: string;
      thumbnails: { medium: { url: string } };
      publishedAt: Date;
      channelTitle: string;
      channelId: string;
    };
    contentDetails: { upload: { videoId: string } };
  }

  export interface Comment{
    videoId: string;
    textOriginal:string;
    authorDisplayName: string;
    authorProfileImageUrl:string;
    authorChannelUrl:string;
    authorChannelId:string;
    likeCount:string;
    publishedAt: string;
    totalReplyCount: string;
    //if have replies
    replies: {
      textOriginal:string;
      authorDisplayName: string;
      authorProfileImageUrl:string;
      authorChannelUrl:string;
      authorChannelId:string;
      likeCount:string;
      publishedAt: string;
    }[]|null;
  }