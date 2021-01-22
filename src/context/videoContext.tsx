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

      return {
        ...state,
        playing: false,
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
        interval: null,
        playing: false,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function VideoProvider({ children }: { children: any }) {
  const configFromUrl = videoConfig.find((config: IVideoConfig) => config.slug === window.location.hash.replace('#', ''));
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
