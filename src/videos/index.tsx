import { useState } from 'react';
import YouTube from 'react-youtube';
import styled from 'styled-components';

// Config
import { IVideoList } from 'constants/config';
import { IThemeProvider } from 'constants/styles';
import { useVideoState } from 'context/videoContext';

export const Videos = () => {
  const { activeConfig } = useVideoState();
  const [videos, setVideos] = useState<IVideoList>(activeConfig.videos);

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
  top: calc(50vh - ${WH / 2}px + ${(props: IThemeProvider) => props.theme.headerHeight / 2}px);
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
