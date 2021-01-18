import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import styled from 'styled-components';


// Config
import { videoConfig, IVideoList } from '../constants/config';
import { HEADER_HEIGHT, LOGO_WIDTH } from '../constants/styles';

export const Videos = ({ activeIndex }: { activeIndex: number }) => {
  const [videos, setVideos] = useState<IVideoList>(videoConfig[activeIndex].videos);

  let stagger: any;

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
      newVideos[key].status = e.target.getPlayerState();
      e.target.seekTo(videos[key].start);
      e.target.pauseVideo();
      setVideos(newVideos);
    }
  }
  
  const onStateChange = (e: any, key: string) => {
    const newVideos = Object.assign({}, videos);
    newVideos[key].status = e.target.getPlayerState();
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
    stagger = setInterval(() => {
      videoArray[toPlay].target.pauseVideo();
      
      toPlay = videoArray.length === toPlay + 1 ? 0 : ++toPlay;
      videoArray[toPlay].target.playVideo();

    }, 5000);
  }

  const pauseAll = () => {
    Object.keys(videos).forEach(key => {
      videos[key].target.pauseVideo();
    });

    clearInterval(stagger);
  }

  const toggleVideo = (key: string, status?: number) => {
    if (status === 1) {
      videos[key].target.pauseVideo();
    } else {
      videos[key].target.playVideo();
    }
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
        <StyledVideoStatus>
          {Object.keys(videos).map((key, index) => {
            const status = videos[key].status;
            return (
              <StyledVideoStatusButton
                key={index}
                onClick={() => toggleVideo(key, status)}
                isPlaying={status === 1}
              >
                {status === 1 ? '||' : '|>'}
              </StyledVideoStatusButton>
            );
          })}
        </StyledVideoStatus>
        {Object.keys(videos).map((key, index) => {
          return (
            <StyledYouTube
              key={index}
              videoId={key}
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

const WH = 50;
const StyledVideoStatus = styled.div`
  display: flex;
  flex-wrap: wrap;
  left: calc(50% - ${WH / 2}px + ${LOGO_WIDTH / 2}px);
  height: ${WH}px;
  position: fixed;
  top: calc(50vh - ${WH / 2}px + ${HEADER_HEIGHT / 2}px);
  width: ${WH}px;
`;

const StyledVideoStatusButton = styled.button`
  background: ${(props: { isPlaying: boolean }) => props.isPlaying ? 'green' : 'red' };
  border: none;
  width: 50%;
  
  &:nth-child(1) {
    border-right: 1px solid black;
  }
  &:nth-child(3) {
    border-top: 1px solid black;
    border-right: 1px solid black;
  }
  &:nth-child(4) {
    border-top: 1px solid black;
  }
`;
