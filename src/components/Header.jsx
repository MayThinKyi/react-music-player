import React, { useContext } from "react";
import { FaMusic } from "react-icons/fa";
import { MusicPlayerContext } from "../contexts/AppContext";

const Header = () => {
  const { menuState, setMenuState } = useContext(MusicPlayerContext);
  return (
    <div className="py-3 px-3 sm:px-0  cursor-pointer flex items-center justify-between">
      <h1 className="text-2xl font-[500]">Waves</h1>
      <div
        onClick={() => {
          setMenuState(!menuState);
        }}
        className="animation gap-1 hover:bg-black hover:text-white border-2 border-black py-2 px-3 flex items-center"
      >
        <h1>Library</h1>
        <FaMusic />
      </div>
    </div>
  );
};

export default Header;
