import React, { useContext } from "react";
import { data } from "../Helpers/data.js";
import LibraryItem from "./LibraryItem";
import { MusicPlayerContext } from "../contexts/AppContext.js";
import { FaMusic } from "react-icons/fa";

const Slider = () => {
  const { menuState, setMenuState } = useContext(MusicPlayerContext);

  return (
    <div className="wrapper">
      <div
        className={` absolute top-0 left-0 shadow-3xl overflow-x-hidden overflow-y-scroll bg-white z-[999] w-[100vw] md:w-[350px] 
       h-[100vh]  `}
      >
        <div className="flex justify-around sm:justify-between items-center">
          <h1 className="text-2xl  sm:px-8 pt-6 font-semibold ">My Library</h1>
          <div
            onClick={() => {
              setMenuState(!menuState);
            }}
            className="md:hidden gap-1 mt-5 hover:bg-black hover:text-white border-2 border-black py-2 px-3 flex items-center"
          >
            <h1>Library</h1>
            <FaMusic />
          </div>
        </div>

        <div className="my-8 ">
          {data?.map((item, i) => {
            return (
              <LibraryItem
                id={item?.id}
                key={i}
                img={item?.img}
                title={item?.title}
                singer={item?.singer}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Slider;
