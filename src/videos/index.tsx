import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import styled from 'styled-components';

// Config
import { IVideoList } from 'constants/config';
import { IThemeProvider } from 'constants/styles';
import { useVideoState, VideoStatus } from 'context/videoContext';

import { pauseVideos, playVideos, progressVideos, resetVideos, staggerVideos } from 'utils/video';

export const Videos = () => {
  const { activeConfig, duration, status } = useVideoState();
  const [videos, setVideos] = useState<IVideoList>(activeConfig.videos);

  const opts = {
    playerVars: {
      autoplay: 0,
    },
  };

  useEffect(() => {
    switch (status) {
      case VideoStatus.PLAY: {
        playVideos(videos);
        break;
      }
      case VideoStatus.STAGGER: {
        staggerVideos(videos, duration);
        break;
      }
      case VideoStatus.PROGRESS: {
        progressVideos(videos, duration, () => {
          getVideoStates();
        });
        break;
      }
      case VideoStatus.PAUSE: {
        pauseVideos(videos);
        break;
      }
      case VideoStatus.READY: {
        resetVideos(videos);
        break;
      }
    };
  }, [status]);

  const onReady = (e: any, key: string) => {
    if (!videos[key].target) {
      videos[key].target = e.target;
      videos[key].muted = e.target.unMute();
      videos[key].status = e.target.getPlayerState();
      videos[key].muted = e.target.isMuted();
      e.target.seekTo(videos[key].start);
      e.target.pauseVideo();
    }
  }
  
  const onStateChange = (e: any, key: string) => {
    const newVideos = Object.assign({}, videos);
    newVideos[key].status = e.target.getPlayerState();
    newVideos[key].muted = e.target.isMuted();
    setVideos(newVideos);
  }

  const getVideoStates = () => {
    Object.keys(videos).forEach((key: string) => {
      videos[key].status = videos[key].target.getPlayerState();
      videos[key].muted = videos[key].target.isMuted();
    });

    setVideos(videos);
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
              onClick={() => alert('todo')}
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
    </>
  );
}

const WH = 50;
const BORDER_WIDTH = 2;

const StyledVideoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr;
  height: calc(100vh - ${(props: IThemeProvider) => props.theme.headerHeight}px);

  > div {
    ${(props: IThemeProvider ) => `
      &:nth-child(1) {
        border-right: ${BORDER_WIDTH}px solid ${props.theme.primaryColor};
        border-bottom: ${BORDER_WIDTH}px solid ${props.theme.primaryColor};
      }
      &:nth-child(2) {
        border-bottom: ${BORDER_WIDTH}px solid ${props.theme.primaryColor};
      }
      &:nth-child(3) {
        border-right: ${BORDER_WIDTH}px solid ${props.theme.primaryColor};
      }
    `}
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

const StyledVideoStatus = styled.div`
  display: flex;
  flex-wrap: wrap;
  left: calc(50% - ${WH / 2}px + ${(props: IThemeProvider) => props.theme.logoWidth / 2}px);
  height: ${WH}px;
  position: fixed;
  top: calc(50vh - ${WH / 2}px + ${(props: IThemeProvider) => props.theme.headerHeight / 2}px - ${BORDER_WIDTH - BORDER_WIDTH / 2}px);
  width: ${WH}px;
  z-index: 1;
`;

const StyledVideoStatusButton = styled.button`
  background: ${(props: { isPlaying: boolean }) => props.isPlaying ? 'green' : 'red' };
  border: none;
  width: 50%;
  
  ${(props: IThemeProvider ) => `
    &:nth-child(1) {
      border-right: ${BORDER_WIDTH}px solid ${props.theme.primaryColor};
    }
    &:nth-child(3) {
      border-top: ${BORDER_WIDTH}px solid ${props.theme.primaryColor};
      border-right: ${BORDER_WIDTH}px solid ${props.theme.primaryColor};
    }
    &:nth-child(4) {
      border-top: ${BORDER_WIDTH}px solid ${props.theme.primaryColor};
    }
  `}
`;
