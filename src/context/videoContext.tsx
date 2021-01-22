import React from 'react';

import { videoConfig, IVideoConfig } from 'constants/config';

interface IVideoContext {
  videoConfig: IVideoConfig[];
  activeConfig: IVideoConfig;
  playing: boolean;
  interval: null | number;
}

interface IVideoDispatch {
  type: string;
  duration?: number;
}

const VideoStateContext = React.createContext<IVideoContext | undefined>(undefined);
const VideoDispatchContext = React.createContext<any | undefined>(undefined);

function videoReducer(state: IVideoContext, action: IVideoDispatch) {
  switch (action.type) {
    case 'play': {
      Object.keys(state.activeConfig.videos).forEach(key => {
        state.activeConfig.videos[key].target.playVideo();
      });

      return {
        ...state,
        playing: true,
      };
    }
    case 'pause': {
      Object.keys(state.activeConfig.videos).forEach(key => {
        state.activeConfig.videos[key].target.pauseVideo();
      });

      // Clear any intervals
      if (state.interval) {
        clearInterval(state.interval);
      }

      return {
        ...state,
        playing: false,
        interval: null,
      };
    }
    case 'reset': {
      Object.keys(state.activeConfig.videos).forEach(key => {
        const videos = state.activeConfig.videos;

        // Unmute
        videos[key].target.unMute();

        // Seek to beginning
        videos[key].target.seekTo(videos[key].start);

        // Pause
        videos[key].target.pauseVideo();
      });
  
      // Clear any intervals
      if (state.interval) {
        clearInterval(state.interval);
      }

      return {
        ...state,
        playing: false,
        interval: null,
      }
    }
    case 'stagger': {
      const videoArray = Object.keys(state.activeConfig.videos).map(key => state.activeConfig.videos[key]);
      let toPlay = 0;

      // Play first video
      videoArray[toPlay].target.playVideo();
      
      // Stagger the playing of the rest of the videos
      const interval = window.setInterval(function() {
        videoArray[toPlay].target.pauseVideo();
        
        toPlay = videoArray.length === toPlay + 1 ? 0 : ++toPlay;
        videoArray[toPlay].target.playVideo();

      }, action.duration);

      return {
        ...state,
        playing: true,
        interval,
      }
    }
    case 'progress': {
      const videos = state.activeConfig.videos;
      const videoArray = Object.keys(videos).map(key => ({
        key,
        ...videos[key],
      }));
      let toMute = 0;
  
      // Play and mute all videos
      Object.keys(videos).forEach(key => {
        videos[key].target.mute();
        videos[key].target.playVideo();
      });
  
      // Unmute the first one
      videos[videoArray[toMute].key].target.unMute();
      
      // Stagger the unmuting of the rest of the videos
      const interval = window.setInterval(() => {
        const newVideos = Object.assign({}, videos);
        newVideos[videoArray[toMute].key].target.mute();
        newVideos[videoArray[toMute].key].muted = true;
        
        toMute = videoArray.length === toMute + 1 ? 0 : ++toMute;
        newVideos[videoArray[toMute].key].target.unMute();
        newVideos[videoArray[toMute].key].muted = false;
  
        // setVideos(newVideos);
      }, action.duration);

      return {
        ...state,
        playing: true,
        interval,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function VideoProvider({ children }: { children: any }) {
  const configFromUrl = videoConfig.find((config: IVideoConfig) => config.slug === window.location.hash.replace('#', ''));
  // @ts-ignore
  const [state, dispatch] = React.useReducer(videoReducer, {
    videoConfig,
    activeConfig: configFromUrl || videoConfig[0],
    playing: false,
    interval: null,
  });

  return (
    <VideoStateContext.Provider value={state}>
      <VideoDispatchContext.Provider value={dispatch}>
        {children}
      </VideoDispatchContext.Provider>
    </VideoStateContext.Provider>
  )
}

function useVideoState() {
  const context = React.useContext(VideoStateContext);
  if (context === undefined) {
    throw new Error('useVideoState must be used within a VideoProvider');
  }
  return context;
}

function useVideoDispatch() {
  const context = React.useContext(VideoDispatchContext);
  if (context === undefined) {
    throw new Error('useVideoDispatch must be used within a VideoProvider');
  }
  return context;
}

export { VideoProvider, useVideoState, useVideoDispatch }
