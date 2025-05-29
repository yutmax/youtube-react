import { useRef, useState, useEffect, useCallback } from "react";
import video from "../video/video2.mp4";
import CustomRange from "./CustomRange";
import { useMediaQuery } from "react-responsive";

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoadedMetadata, setIsLoadedMetadata] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const videoRef = useRef(null);
  const progressBarRef = useRef();
  const animationFrameRef = useRef();

  const updateProgress = useCallback(() => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      const currentProgress = duration ? (currentTime / duration) * 100 : 0;

      setCurrentTime(currentTime);
      setProgress(currentProgress);

      if (isPlaying) {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      }
    }
  }, [isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
      cancelAnimationFrame(animationFrameRef.current);
    } else {
      videoRef.current.play();
      animationFrameRef.current = requestAnimationFrame(updateProgress);
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
    setIsLoadedMetadata(true);
  };

  const handleProgressBarClick = (e) => {
    if (!progressBarRef.current || !videoRef.current) return;

    const progressBar = progressBarRef.current;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.clientWidth;
    const clickPercentage = (clickPosition / progressBarWidth) * 100;
    const newTime = (clickPercentage / 100) * duration;

    videoRef.current.currentTime = newTime;

    setCurrentTime(newTime);
    setProgress(clickPercentage);

    if (!isPlaying) {
      updateProgress();
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const toggleVolume = () => {
    if (volume > 0) {
      setVolume(0);
    } else {
      setVolume(1);
    }
  };

  useEffect(() => {
    const video = videoRef.current;

    const handlePlay = () => {
      setIsPlaying(true);
      animationFrameRef.current = requestAnimationFrame(updateProgress);
    };

    const handlePause = () => {
      setIsPlaying(false);
      cancelAnimationFrame(animationFrameRef.current);
    };

    if (video) {
      video.addEventListener("play", handlePlay);
      video.addEventListener("pause", handlePause);
      video.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("pause", handlePause);
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        cancelAnimationFrame(animationFrameRef.current);
      };
    }
  }, [updateProgress]);

  return (
    <div className="video-player">
      <video className="video-player__video" src={video} ref={videoRef} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />

      {isMobile ? (
        <div className="video-player__toolbar-min video-toolbar-min">
          <div className="video-toolbar-min__wrapper">
            <button onClick={togglePlay} className={`video-toolbar-min__control video-toolbar-min__control--play ${isPlaying ? "_play" : ""}`}></button>

            <div className="video-toolbar-min__progress-info">
              <div className="video-toolbar-min__time">12:12</div>

              <div className="video-toolbar-min__progress-bar video-progress-bar video-progress-bar--min" ref={progressBarRef} onClick={handleProgressBarClick}>
                <div className="video-progress-bar__progress" style={{ width: `${progress}%` }}></div>
              </div>

              <div className="video-toolbar-min__time">12:12</div>
            </div>

            <button onClick={toggleVolume} className={`video-toolbar-min__control ${volume === 0 ? "_volume-off" : null}`}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M21.36 12C21.36 16.725 18.015 20.37 13.5 21.465V24C19.485 22.86 24 17.91 24 12C24 6.075 19.485 1.125 13.5 0V2.52C18.015 3.615 21.36 7.26 21.36 12ZM10.5 23.25L3.6 15.66H0V8.31H3.585L10.5 0.72V23.25ZM18 11.985C18 9.6 16.11 7.575 13.5 6.81V17.16C16.11 16.395 18 14.385 18 11.985Z" fill="white" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="video-player__toolbar video-toolbar">
          <div className="video-toolbar__times">
            <span className="video-toolbar__current-time">{formatTime(currentTime)}</span>
            <span className="video-toolbar__duration">{formatTime(duration)}</span>
          </div>

          <div className="video-toolbar__progress-bar video-progress-bar" ref={progressBarRef} onClick={handleProgressBarClick}>
            <div className="video-progress-bar__progress" style={{ width: `${progress}%` }}></div>
          </div>

          <div className="video-toolbar__controls video-controls">
            <div className="video-controls__left">
              <button onClick={togglePlay} className={`video-controls__control video-controls__control--play ${isPlaying ? "play" : ""}`}></button>
              <button className="video-controls__control">
                <svg width="27" height="18" viewBox="0 0 27 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8 0V5.985L0 0V16.5L10.8 10.5V16.5L23.25 9.9V16.5H27V0H23.25V7.425L10.8 0Z" fill="white" />
                </svg>
              </button>
              <button onClick={toggleVolume} className={`video-controls__control ${volume === 0 ? "_volume-off" : null}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M21.36 12C21.36 16.725 18.015 20.37 13.5 21.465V24C19.485 22.86 24 17.91 24 12C24 6.075 19.485 1.125 13.5 0V2.52C18.015 3.615 21.36 7.26 21.36 12ZM10.5 23.25L3.6 15.66H0V8.31H3.585L10.5 0.72V23.25ZM18 11.985C18 9.6 16.11 7.575 13.5 6.81V17.16C16.11 16.395 18 14.385 18 11.985Z" fill="white" />
                </svg>
              </button>
              <CustomRange volume={volume} onVolumeChange={handleVolumeChange} />
            </div>
            <div className="video-controls__right">
              <button className="video-controls__control">
                <svg width="27" height="18" viewBox="0 0 27 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M0 18H27V0H0V18ZM12.075 11.25C11.865 11.685 11.58 12.06 11.235 12.36C10.89 12.66 10.485 12.9 10.035 13.05C9.57 13.215 9.06 13.29 8.505 13.29C7.815 13.29 7.185 13.185 6.645 12.96C6.09 12.72 5.625 12.405 5.25 12.015C4.86 11.61 4.575 11.13 4.365 10.59C4.17 10.05 4.065 9.465 4.065 8.835C4.065 8.205 4.17 7.605 4.365 7.05C4.575 6.51 4.86 6.03 5.25 5.61C5.625 5.205 6.09 4.89 6.645 4.65C7.185 4.425 7.815 4.305 8.505 4.305C9 4.305 9.465 4.365 9.915 4.515C10.35 4.65 10.74 4.845 11.1 5.1C11.445 5.37 11.73 5.685 11.955 6.075C12.195 6.465 12.33 6.9 12.39 7.395H10.47C10.44 7.185 10.365 6.99 10.245 6.81C10.125 6.615 9.975 6.465 9.795 6.33C9.63 6.195 9.42 6.09 9.21 6.015C8.97 5.925 8.745 5.895 8.505 5.895C8.055 5.895 7.68 5.97 7.365 6.135C7.05 6.3 6.795 6.525 6.6 6.81C6.405 7.08 6.27 7.395 6.18 7.755C6.09 8.1 6.045 8.46 6.045 8.835C6.045 9.21 6.09 9.555 6.18 9.9C6.27 10.23 6.405 10.545 6.6 10.815C6.795 11.085 7.05 11.31 7.365 11.475C7.68 11.64 8.055 11.715 8.505 11.715C9.105 11.715 9.585 11.55 9.915 11.19C10.26 10.83 10.47 10.365 10.545 9.795H12.465C12.42 10.335 12.285 10.815 12.075 11.25ZM22.56 11.265C22.35 11.7 22.08 12.06 21.735 12.36C21.39 12.675 20.985 12.9 20.52 13.065C20.055 13.23 19.545 13.305 18.99 13.305C18.3 13.305 17.685 13.2 17.13 12.96C16.575 12.735 16.11 12.42 15.735 12.015C15.36 11.625 15.06 11.145 14.865 10.605C14.655 10.065 14.55 9.48 14.55 8.85C14.55 8.205 14.655 7.62 14.865 7.065C15.06 6.51 15.36 6.03 15.735 5.625C16.11 5.22 16.575 4.89 17.13 4.665C17.685 4.425 18.3 4.32 18.99 4.32C19.485 4.32 19.95 4.38 20.4 4.515C20.835 4.65 21.24 4.86 21.585 5.115C21.93 5.37 22.23 5.7 22.455 6.09C22.68 6.465 22.815 6.915 22.875 7.41H20.955C20.925 7.185 20.85 6.99 20.73 6.81C20.61 6.63 20.475 6.48 20.295 6.33C20.115 6.195 19.905 6.09 19.695 6.015C19.47 5.94 19.23 5.91 18.99 5.91C18.54 5.91 18.165 5.985 17.85 6.15C17.55 6.315 17.295 6.54 17.1 6.81C16.905 7.095 16.755 7.41 16.665 7.755C16.59 8.115 16.545 8.475 16.545 8.85C16.545 9.21 16.59 9.57 16.665 9.9C16.755 10.245 16.905 10.56 17.1 10.83C17.295 11.1 17.55 11.325 17.85 11.49C18.165 11.64 18.54 11.73 18.99 11.73C19.59 11.73 20.07 11.55 20.415 11.205C20.76 10.845 20.955 10.38 21.03 9.81H22.95C22.905 10.335 22.77 10.83 22.56 11.265Z" fill="white" />
                </svg>
              </button>
              <button className="video-controls__control">
                <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M27 15.525V11.475H23.415C23.16 10.185 22.65 8.985 21.945 7.92L24.465 5.4L21.6 2.535L19.08 5.055C18.015 4.35 16.815 3.84 15.525 3.57V0H11.475V3.57C10.17 3.84 8.97 4.35 7.905 5.055L5.385 2.535L2.52 5.4L5.04 7.92C4.335 8.985 3.825 10.185 3.57 11.475H0V15.525H3.57C3.84 16.815 4.35 18.015 5.055 19.08L2.52 21.615L5.385 24.48L7.92 21.945C8.985 22.65 10.185 23.16 11.475 23.415V27H15.525V23.415C16.815 23.16 18 22.65 19.065 21.945L21.6 24.48L24.465 21.615L21.93 19.08C22.635 18.015 23.145 16.815 23.415 15.525H27ZM13.5 19.575C10.14 19.575 7.425 16.845 7.425 13.5C7.425 10.14 10.14 7.425 13.5 7.425C16.845 7.425 19.575 10.14 19.575 13.5C19.575 16.845 16.845 19.575 13.5 19.575Z" fill="white" />
                </svg>
              </button>
              <button className="video-controls__control">
                <svg width="30" height="21" viewBox="0 0 30 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M0 0H30V21H0V0ZM4.5 16.5H25.5V4.5H4.5V16.5Z" fill="white" />
                </svg>
              </button>
              <button className="video-controls__control">
                <svg width="33" height="24" viewBox="0 0 33 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M0 9H4.5V4.5H9V0H0V9ZM24 0V4.5H28.5V9H33V0H24ZM24 19.5V24H33V15H28.5V19.5H24ZM4.5 15H0V24H9V19.5H4.5V15Z" fill="white" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
