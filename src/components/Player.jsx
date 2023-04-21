import React, { useContext, useEffect, useState } from "react";
import {
  TbPlayerTrackPrevFilled,
  TbPlayerTrackNextFilled,
} from "react-icons/tb";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import { MusicPlayerContext } from "../contexts/AppContext";
import { data } from "../Helpers/data";

const Player = () => {
  const { currentSongId, setCurrentSongId } = useContext(MusicPlayerContext);
  const [music, setMusic] = useState([]);
  const [isPlayed, setIsPlayed] = useState(false);
  const [duration, setDuration] = useState("");
  const playHandle = () => {
    document.getElementsByTagName("audio")[0].play();
    setIsPlayed(true);
  };
  const pauseHandle = () => {
    document.getElementsByTagName("audio")[0].pause();

    setIsPlayed(false);
  };

  useEffect(() => {
    setMusic(data && data[currentSongId - 1]);
    console.log("Music", data[currentSongId - 1]);
  }, [currentSongId]);
  return (
    <div className="text-center">
      <img
        className="mx-auto w-[235px] h-[235px] sm:w-[265px] sm:h-[265px] rounded-full"
        src={music?.img}
      />
      <h1 className="mt-8 mb-2 text-xl sm:text-2xl font-[600] text-black">
        {music?.title}
      </h1>
      <h1 className=" text-[16px] sm:text-lg  text-slate-600">
        {music?.singer}
      </h1>
      <div className="flex items-center justify-center sm:gap-4">
        <h1 className="text-[16px]sm:text-lg  text-slate-600">0:08</h1>
        <div className="  my-6 bg-[#CCCCCC] rounded-xl h-[16px] w-[450px]">
          <audio
            className="hidden"
            controls
            src="https://res.cloudinary.com/dwnhvrn5f/video/upload/v1681981495/musics/Y2Mate.is_-_Vampire_Empire_-_Big_Thief-2CvLK-Tr8YA-160k-1657622501737_rgcnv2.mp3"
          />
        </div>
        <h1 className="text-[16px] sm:text-lg  text-slate-600">2:55</h1>
      </div>
      <div className="flex items-center justify-center gap-6 sm:gap-24">
        <h1 className=" ">
          <TbPlayerTrackPrevFilled className="text-2xl sm:text-3xl" />
        </h1>
        <h1 className=" ">
          {isPlayed ? (
            <BsPauseFill
              onClick={pauseHandle}
              className="text-4xl sm:text-6xl"
            />
          ) : (
            <BsFillPlayFill
              onClick={playHandle}
              className=" text-4xl  sm:text-6xl"
            />
          )}
        </h1>
        <h1 className="  ">
          <TbPlayerTrackNextFilled className="text-2xl  sm:text-3xl" />
        </h1>
      </div>
    </div>
  );
};

export default Player;
