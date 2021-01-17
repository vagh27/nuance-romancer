import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import styled from 'styled-components';


// Config
import { videoConfig, IVideoList } from '../constants/config';
import { HEADER_HEIGHT } from '../constants/styles';

export const Videos = ({ activeIndex }: { activeIndex: number }) => {
  const [videos, setVideos] = useState<IVideoList>(videoConfig[activeIndex].videos);

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
      console.log('Initializing Videos');
      newVideos[key].target = e.target;
      e.target.seekTo(videos[key].start);
      e.target.pauseVideo();
      setVideos(newVideos);
    }
  }

  const playAll = () => {
    Object.keys(videos).forEach(key => {
      videos[key].target.playVideo();
    });
  }

  const pauseAll = () => {
    Object.keys(videos).forEach(key => {
      videos[key].target.pauseVideo();
    });
  }

  const reset = () => {
    Object.keys(videos).forEach(key => {
      videos[key].target.seekTo(videos[key].start);
      videos[key].target.playVideo();
    });
  }

  return (
    <>
      <StyledVideoContainer>
        {Object.keys(videos).map((key, index) => {
          return (
            <StyledYouTube
              key={index}
              videoId={key}
              // @ts-ignore
              opts={opts}
              onReady={e => onReady(e, key)}
              onStateChange={e => onReady(e, key)}
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
  height: calc(100vh - ${HEADER_HEIGHT}px);
`;

const StyledYouTube = styled(YouTube)`
  height: 100%;
  width: 100%;
  iframe {
    height: 100%;
    width: 100%;
  }
`;
