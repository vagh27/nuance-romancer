import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import styled from 'styled-components';

// Config
import { videoConfig, IVideoList } from 'constants/config';
import { IThemeProvider } from 'constants/styles';

export const Videos = ({ activeIndex }: { activeIndex: number }) => {
  const [videos, setVideos] = useState<IVideoList>(videoConfig[activeIndex].videos);
  const [interval, assignInterval] = useState<number | undefined>();

  useEffect(() => {
    setVideos(videoConfig[activeIndex].videos);
  }, [activeIndex]);

  const opts = {
    playerVars: {
      autoplay: 0,
    },
  };

  const onReady = (e: any, key: string) => {
    const newVideos = Object.assign({}, videos);

    if (!newVideos[key].target) {
      newVideos[key].target = e.target;
      newVideos[key].muted = e.target.unMute();
      newVideos[key].status = e.target.getPlayerState();
      newVideos[key].muted = e.target.isMuted();
      e.target.seekTo(videos[key].start);
      e.target.pauseVideo();
      setVideos(newVideos);
    }
  }
  
  const onStateChange = (e: any, key: string) => {
    const newVideos = Object.assign({}, videos);
    newVideos[key].status = e.target.getPlayerState();
    newVideos[key].muted = e.target.isMuted();
    setVideos(newVideos);
  }

  const playAll = () => {
    Object.keys(videos).forEach(key => {
      videos[key].target.playVideo();
    });
  }

  const staggerAll = () => {
    const videoArray = Object.keys(videos).map(key => videos[key]);
    let toPlay = 0;

    // Play first video
    videoArray[toPlay].target.playVideo();
    
    // Stagger the playing of the rest of the videos
    const interval = window.setInterval(function() {
      videoArray[toPlay].target.pauseVideo();
      
      toPlay = videoArray.length === toPlay + 1 ? 0 : ++toPlay;
      videoArray[toPlay].target.playVideo();

    }, 5000);

    assignInterval(interval);
  }

  const progressAll = () => {
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

      setVideos(newVideos);
    }, 5000);

    assignInterval(interval);
  }

  const pauseAll = () => {
    // Pause videos in state
    Object.keys(videos).forEach(key => {
      videos[key].target.pauseVideo();
    });

    // Clear any intervals
    clearInterval(interval);
  }

  const toggleVideo  = (key: string, status?: number) => {
    if (status === 1) {
      videos[key].target.pauseVideo();
    } else {
      videos[key].target.playVideo();
    }
  }

  const reset = () => {
    Object.keys(videos).forEach(key => {
      videos[key].target.unMute();
      videos[key].target.seekTo(videos[key].start);
      videos[key].target.pauseVideo();
    });

    // Clear any intervals
    clearInterval(interval);
  }

  return (
    <>
      <StyledVideoStatus>
        {Object.keys(videos).map((key, index) => {
          const status = videos[key].status;
          const muted = videos[key].muted;
          return (
            <StyledVideoStatusButton
              key={index}
              onClick={() => toggleVideo(key, status)}
              isPlaying={status === 1}
            >
              {muted ? 'M' : 'S'}
            </StyledVideoStatusButton>
          );
        })}
      </StyledVideoStatus>
      <StyledVideoContainer>
        {Object.keys(videos).map((key, index) => {
          const isActive = videos[key].status === 1 && !videos[key].muted;
          return (
            <StyledYouTube
              key={index}
              videoId={key}
              isActive={isActive}
              // @ts-ignore
              opts={opts}
              onReady={e => onReady(e, key)}
              onStateChange={e => onStateChange(e, key)}
            />
          );
        })}
      </StyledVideoContainer>

      <button
        onClick={playAll}
      >
        Play All
      </button>
      <button
        onClick={staggerAll}
      >
        Stagger All
      </button>
      <button
        onClick={progressAll}
      >
        Progress All
      </button>
      <button
        onClick={pauseAll}
      >
        Pause All
      </button>
      <button
        onClick={reset}
      >
        Reset
      </button>
    </>
  );
}

const StyledVideoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr;
  height: calc(100vh - ${(props: IThemeProvider) => props.theme.headerHeight}px);

  > div {
    &:nth-child(1) {
      border-right: 1px solid ${(props: IThemeProvider ) => props.theme.primaryColor};
    }
    &:nth-child(3) {
      border-top: 1px solid ${(props: IThemeProvider ) => props.theme.primaryColor};
      border-right: 1px solid ${(props: IThemeProvider ) => props.theme.primaryColor};
    }
    &:nth-child(4) {
      border-top: 1px solid ${(props: IThemeProvider ) => props.theme.primaryColor};
    }
  }
`;

const StyledYouTube = styled(YouTube)`
  height: 100%;
  opacity: ${(props: { isActive: boolean }) => props.isActive ? 1 : 0.85 };
  transition: all .1s linear;
  width: 100%;

  iframe {
    height: 100%;
    width: 100%;
  }
`;

const WH = 50;
const StyledVideoStatus = styled.div`
  display: flex;
  flex-wrap: wrap;
  left: calc(50% - ${WH / 2}px + ${(props: IThemeProvider) => props.theme.logoWidth / 2}px);
  height: ${WH}px;
  position: fixed;
  top: calc(50vh - ${WH / 2}px + ${(props: IThemeProvider) => props.theme.logoWidth / 2}px);
  width: ${WH}px;
  z-index: 1;
`;

const StyledVideoStatusButton = styled.button`
  background: ${(props: { isPlaying: boolean }) => props.isPlaying ? 'green' : 'red' };
  border: none;
  width: 50%;
  
  &:nth-child(1) {
    border-right: 1px solid ${(props: IThemeProvider ) => props.theme.primaryColor};
  }
  &:nth-child(3) {
    border-top: 1px solid ${(props: IThemeProvider ) => props.theme.primaryColor};
    border-right: 1px solid ${(props: IThemeProvider ) => props.theme.primaryColor};
  }
  &:nth-child(4) {
    border-top: 1px solid ${(props: IThemeProvider ) => props.theme.primaryColor};
  }
`;
