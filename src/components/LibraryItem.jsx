import React, { useContext } from "react";
import { MusicPlayerContext } from "../contexts/AppContext";

const LibraryItem = ({ id, img, title, singer }) => {
  const { currentSongId, setCurrentSongId } = useContext(MusicPlayerContext);
  return (
    <div
      onClick={() => setCurrentSongId(id)}
      className={` cursor-pointer ${id == currentSongId ? "bg-slate-200 " : ""}
       px-4 sm:px-8 py-4  mb-2 flex items-center gap-4 hover:bg-slate-200 `}
    >
      <img src={img} className=" w-[60px] h-[60px] sm:w-[80px] sm:h-[80px]" />
      <div>
        <h1 className="text-[16px]">{title}</h1>
        <h1 className=" text-slate-500 text-[14px]">{singer}</h1>
      </div>
    </div>
  );
};

export default LibraryItem;
