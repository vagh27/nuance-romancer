import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import styled from 'styled-components';
import { SoundOutlined } from '@ant-design/icons';


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
      controls: 0,
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
        progressVideos(videos, duration, (newVideos: IVideoList) => {
          setVideos(newVideos);
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
  }, [status, duration, videos]);

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

  const toggleVideoAudio = (key: string) => {
    const newVideos = Object.assign({}, videos);
    let muted = false;

    if (newVideos[key].target.isMuted()) {
      newVideos[key].target.unMute();
    } else {
      newVideos[key].target.mute();
      muted = true;
    }

    newVideos[key].muted = muted;
    setVideos(newVideos);
  }

  return (
    <>
      <StyledVideoStatus>
        {Object.keys(videos).map((key, index) => (
          <StyledVideoStatusButton
            key={index}
            onClick={() => toggleVideoAudio(key)}
            muted={!!videos[key].muted}
          >
            <SoundOutlined />
          </StyledVideoStatusButton>
        ))}
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
    ${(props: IThemeProvider) => `
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

interface IVideoStatusButton extends IThemeProvider {
  muted: boolean;
}
const StyledVideoStatusButton = styled.button`
  background: ${(props: IVideoStatusButton) => props.theme.primaryColor};
  border: none;
  cursor: pointer;
  opacity: ${(props: IVideoStatusButton) => props.muted ? 0.3 : 0.7};
  transition: all .1s linear;
  width: 50%;
  
  ${(props: IVideoStatusButton) => `
    &:nth-child(1) {
      border-right: ${BORDER_WIDTH}px solid ${props.theme.primaryColor};
      svg {
        transform: rotate(${225}deg);
      } 
    }
    &:nth-child(2) {
      border-right: ${BORDER_WIDTH}px solid ${props.theme.primaryColor};
      svg {
        transform: rotate(${-45}deg);
      }
    }
    &:nth-child(3) {
      border-top: ${BORDER_WIDTH}px solid ${props.theme.primaryColor};
      border-right: ${BORDER_WIDTH}px solid ${props.theme.primaryColor};
      svg {
        transform: rotate(${135}deg);
      }
    }
    &:nth-child(4) {
      border-top: ${BORDER_WIDTH}px solid ${props.theme.primaryColor};
      svg {
        transform: rotate(${45}deg);
      }
    }
  `}

  &:hover {
    opacity: 1;
  }
`;
