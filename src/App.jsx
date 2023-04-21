import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Player from "./components/Player";
import { MusicPlayerContext } from "./contexts/AppContext";
import Slider from "./components/Slider";

function App() {
  const [menuState, setMenuState] = useState(true);
  const [currentSongId, setCurrentSongId] = useState(1);
  return (
    <div className="App relative transition-all">
      <MusicPlayerContext.Provider
        value={{
          menuState,
          setMenuState,
          currentSongId,
          setCurrentSongId,
        }}
      >
        {menuState && <Slider />}
        <main
          className={`${
            menuState
              ? "md:ml-[400px] md:w-[350px]  lg:ml-[400px] lg:w-[600px]"
              : "w-[280px] sm:w-[500px] md:w-[700px]"
          } mx-auto  h-[100vh] `}
        >
          <Header />
          <Player />
        </main>
      </MusicPlayerContext.Provider>
    </div>
  );
}

export default App;
