import { IVideoList } from 'constants/config';

let interval: number | undefined = undefined;

export const playVideos = (videos: IVideoList) => {
  Object.keys(videos).forEach((key: string) => {
    videos[key]?.target.playVideo();
  });
}

export const staggerVideos = (videos: IVideoList, duration: number) => {
  const videoArray = Object.keys(videos).map(key => videos[key]);
  let toPlay = 0;

  // Play first video
  videoArray[toPlay].target.playVideo();
  
  // Stagger the playing of the rest of the videos
  interval = window.setInterval(function() {
    videoArray[toPlay].target.pauseVideo();
    
    toPlay = videoArray.length === toPlay + 1 ? 0 : ++toPlay;
    videoArray[toPlay].target.playVideo();

  }, duration);
}

export const progressVideos = (videos: IVideoList, duration: number, cb: () => void) => {
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
  interval = window.setInterval(() => {
    const newVideos = Object.assign({}, videos);
    newVideos[videoArray[toMute].key].target.mute();
    newVideos[videoArray[toMute].key].muted = true;
    
    toMute = videoArray.length === toMute + 1 ? 0 : ++toMute;
    newVideos[videoArray[toMute].key].target.unMute();
    newVideos[videoArray[toMute].key].muted = false;

    cb();
  }, duration);
}

export const pauseVideos = (videos: IVideoList) => {
  Object.keys(videos).forEach(key => {
    videos[key].target.pauseVideo();
  });

  // Clear any intervals
  if (interval) {
    clearInterval(interval);
  }
}

export const resetVideos = (videos: IVideoList) => {
  Object.keys(videos).forEach(key => {
    // Unmute
    videos[key].target.unMute();

    // Seek to beginning
    videos[key].target.seekTo(videos[key].start);

    // Pause
    videos[key].target.pauseVideo();
  });

  // Clear any intervals
  if (interval) {
    clearInterval(interval);
  }
}