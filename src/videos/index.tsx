import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';


// Config
import { videoConfig, IVideoList } from '../constants/config';

export const Videos = ({ activeIndex }: { activeIndex: number }) => {
  const [videos, setVideos] = useState<IVideoList>(videoConfig[activeIndex].videos);

  useEffect(() => {
    setVideos(videoConfig[activeIndex].videos);
  }, [activeIndex]);

  const opts = {
    height: '390',
    width: '640',
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
      {Object.keys(videos).map((key, index) => {
        return (
          <YouTube
            key={index}
            videoId={key}
            // @ts-ignore
            opts={opts}
            onReady={e => onReady(e, key)}
            onStateChange={e => onReady(e, key)}
          />
        );
      })}

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
