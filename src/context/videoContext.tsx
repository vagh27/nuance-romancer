import React from 'react';

import { videoConfig, IVideoConfig } from 'constants/config';

export enum VideoStatus {
  PLAY='play',
  PAUSE='pause',
  STAGGER='stagger',
  PROGRESS='progress',
  READY='ready',
  LOADING='loading',
}

interface IVideoContext {
  videoConfig: IVideoConfig[];
  activeConfig: IVideoConfig;
  status: VideoStatus;
  duration: number;
}

interface IVideoDispatch {
  type: string;
  duration?: number;
  status?: VideoStatus;
}

const VideoStateContext = React.createContext<IVideoContext | undefined>(undefined);
const VideoDispatchContext = React.createContext<any | undefined>(undefined);

function videoReducer(state: IVideoContext, action: IVideoDispatch) {
  switch (action.type) {
    case 'SET_STATUS': {
      return {
        ...state,
        duration: action.duration,
        status: action.status,
      };
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
    status: VideoStatus.LOADING,
    duration: 5000,
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
