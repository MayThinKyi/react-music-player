import React, { useContext, useEffect, useRef, useState } from "react";
import {
  TbPlayerTrackPrevFilled,
  TbPlayerTrackNextFilled,
} from "react-icons/tb";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import { MusicPlayerContext } from "../contexts/AppContext";
import { data } from "../Helpers/data";

const Player = () => {
  let { currentSongId, setCurrentSongId } = useContext(MusicPlayerContext);
  const [music, setMusic] = useState([]);
  const [isPlayed, setIsPlayed] = useState(false);
  const [durationData, setDurationData] = useState("0:00");
  const [duration, setDuration] = useState();
  const [currentTime, setCurrentTime] = useState("");
  const [timeProgress, setTimeProgress] = useState();

  let audioRef = useRef();
  const playHandle = () => {
    setIsPlayed(true);
    audioRef.current.play();
  };
  const pauseHandle = () => {
    setIsPlayed(false);
    audioRef.current.pause();
  };
  const nextBtnHandle = () => {
    if (currentSongId === 14) {
      setCurrentSongId(data.length);
    } else {
      setCurrentSongId((currentSongId += 1));
    }

    setIsPlayed(true);
  };

  const prevBtnHandle = () => {
    if (currentSongId === 1) {
      setCurrentSongId(1);
    } else {
      setCurrentSongId((currentSongId -= 1));
    }
    setIsPlayed(true);
  };
  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  const handleLoadMetadata = (meta) => {
    let { duration } = meta.target;
    setDuration(duration);
    setDurationData(formatTime(duration));
  };
  const timeUpdate = () => {
    const minutes = Math.floor(audioRef.current?.currentTime / 60);
    const seconds = Math.floor(audioRef.current?.currentTime - minutes * 60);

    let time = "0 : 00";
    if (seconds < 10 && minutes < 10) {
      time = "0" + minutes + ":" + "0" + seconds;
    } else if (seconds > 10 && minutes < 10) {
      time = "0" + minutes + ":" + seconds;
    } else {
      time = minutes + ":" + seconds;
    }

    setCurrentTime(time);
  };

  const inputDragHandler = (e) => {
    var inputValue = e.target.value;
    audioRef.current.currentTime = inputValue;
  };

  useEffect(() => {
    setMusic(data && data[currentSongId - 1]);
    if (isPlayed) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    if (currentTime !== "00:00" && currentTime === durationData) {
      if (currentSongId === 14) {
        setCurrentSongId(1);
        setCurrentTime("00:01");
      }
      if (currentSongId < 14) {
        setCurrentSongId((currentSongId += 1));
        setCurrentTime("00:01");
      }
    }
  }, [currentSongId, isPlayed, currentTime, durationData]);

  return (
    <div className="text-center ">
      <img
        className="mx-auto w-[235px] h-[235px] sm:w-[265px] sm:h-[265px] rounded-full"
        src={music?.img}
      />
      <h1 className="mt-8  text-xl sm:text-2xl font-[600] text-black">
        {music?.title}
      </h1>
      <h1 className=" text-[16px] sm:text-lg  text-slate-600">
        {music?.singer}
      </h1>
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        <h1 className="text-[15px] font-semibold sm:text-[15px] lg:text-md whitespace-nowrap	  text-slate-900">
          {currentTime}
        </h1>
        <div className="time-control row">
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={audioRef.current?.currentTime}
            onChange={inputDragHandler}
            className="w-[220px] sm:w-[350px] md:w-[300px] lg:w-[400px] my-5 "
          />
        </div>
        <audio
          onTimeUpdate={timeUpdate}
          onLoadedMetadata={handleLoadMetadata}
          autoPlay={isPlayed}
          ref={audioRef}
          className="hidden"
          controls
          src={music?.url}
        />

        <h1 className="text-[15px] font-semibold sm:text-[15px] lg:text-md whitespace-nowrap	  text-slate-900">
          {durationData}
        </h1>
      </div>
      <div className="flex items-center justify-center gap-6 sm:gap-24">
        <h1 onClick={prevBtnHandle} className=" ">
          <TbPlayerTrackPrevFilled className="text-2xl sm:text-3xl" />
        </h1>
        <h1 className=" ">
          {isPlayed ? (
            <BsPauseFill
              onClick={pauseHandle}
              className="text-4xl sm:text-5xl"
            />
          ) : (
            <BsFillPlayFill
              onClick={playHandle}
              className=" text-4xl  sm:text-5xl"
            />
          )}
        </h1>
        <h1 onClick={nextBtnHandle} className="  ">
          <TbPlayerTrackNextFilled className="text-2xl  sm:text-3xl" />
        </h1>
      </div>
    </div>
  );
};

export default Player;
