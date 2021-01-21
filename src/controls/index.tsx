import { useState } from 'react';
import styled from 'styled-components';
import { BuildFilled, CaretRightFilled, ForwardOutlined } from '@ant-design/icons';

// Config
import { videoConfig, IVideoList } from 'constants/config';
import { IThemeProvider } from 'constants/styles';

export const Controls = ({ activeIndex }: { activeIndex: number }) => {
  const [videos, setVideos] = useState<IVideoList>(videoConfig[activeIndex].videos);
  const [interval, assignInterval] = useState<number | undefined>();

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

  // const pauseAll = () => {
  //   // Pause videos in state
  //   Object.keys(videos).forEach(key => {
  //     videos[key].target.pauseVideo();
  //   });

  //   // Clear any intervals
  //   clearInterval(interval);
  // }

  // const toggleVideo  = (key: string, status?: number) => {
  //   if (status === 1) {
  //     videos[key].target.pauseVideo();
  //   } else {
  //     videos[key].target.playVideo();
  //   }
  // }

  // const reset = () => {
  //   Object.keys(videos).forEach(key => {
  //     videos[key].target.unMute();
  //     videos[key].target.seekTo(videos[key].start);
  //     videos[key].target.pauseVideo();
  //   });

  //   // Clear any intervals
  //   clearInterval(interval);
  // }

  return (
    <StyledControlsContainer>
      <StyledControl
        onClick={playAll}
      >
        PLAY ALL <CaretRightFilled />
      </StyledControl>
      <StyledControl
        onClick={staggerAll}
      >
        STAGGER <BuildFilled />
      </StyledControl>
      <StyledControl
        onClick={progressAll}
      >
        PROGRESS <ForwardOutlined />
      </StyledControl>
      {/* <div>
        <StyledControl
          onClick={pauseAll}
        >
          Pause All
        </StyledControl>
        <StyledControl
          onClick={reset}
        >
          Reset
        </StyledControl> */}
    </StyledControlsContainer>
  );
}

const StyledControlsContainer = styled.div`
  display: flex;
`;

const StyledControl = styled.button`
  border: 1px solid white;
  background: black;
  color: white;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  flex: 1;
  transition: all .1s linear;

  &:hover {
    background: ${(props: IThemeProvider ) => props.theme.primaryColor};
    color: black;
  }
`;
