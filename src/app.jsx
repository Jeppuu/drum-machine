import React, { useState, useEffect } from "react";
import "./styles/styles.css"; // Import styles.css
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff, faDrum } from '@fortawesome/free-solid-svg-icons'

const DrumMachine = () => {
  const drumPads = [
    {
      id: "heater1",
      key:"Q",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
      text: "Heater 1",
    },
    {
      id: "heater2",
      key:"W",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
      text: "Heater 2",
    },
    {
      id: "heater3",
      key:"E",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
      text: "Heater 3",
    },
    {
      id: "heater4",
      key:"A",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
      text: "Heater 4",
    },
    {
      id: "clap",
      key:"S",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
      text: "Clap",
    },
    {
      id: "open-HH",
      key:"D",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
      text: "Open HH",
    },
    {
      id: "kick-n'-hat",
      key:"Z",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
      text: "Kick 'n Hat",
    },
    {
      id: "kick",
      key:"X",
      src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
      text: "Kick",
    },
    {
      id: "closed-HH",
      key:"C",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
      text: "Closed HH",
    },
  ];

  const [displayText, setDisplayText] = useState("");
  const [powerOn, setPowerOn] = useState(true);
  const [volume, setVolume] = useState(50); // Initial volume value

  // Add an event listener to listen for keydown events
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [powerOn]);

  const playSound = (audioSrc) => {
    const audio = new Audio(audioSrc);
    audio.volume = volume / 100; // Set volume based on the slider
    audio.play();
  };

  const handlePadClick = (pad) => {
    if (powerOn) {
      playSound(pad.src);
      setDisplayText(pad.text);
    }
  };

  const handleKeyPress = (event) => {
    if (powerOn) {
      const pressedKey = event.key.toUpperCase();
      const drumPad = drumPads.find((pad) => pad.key === pressedKey);
      if (drumPad) {
        playSound(drumPad.src);
        setDisplayText(drumPad.text);
      }
    } else {
    event.preventDefault(); // Prevent the default key behavior when power is off
  }
  };

  const togglePower = () => {
    setPowerOn(!powerOn);
    setDisplayText(powerOn ? "OFF" : "ON");
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  return (
    <div id="drum-machine">
      <div className="top-row">
        <FontAwesomeIcon icon={faDrum} size="2xl" id="logo"/>
        <div id="display">
       <p id="display-text">{displayText}</p>
      </div>
        <div className="volume">
      <input
        type="range"
        orient="vertical"
        min="0"
        max="100"
        value={volume}
        onChange={handleVolumeChange}
        id="slider"
      />
          VOL
        </div>
      <button id="power-button" onClick={togglePower}>
        <FontAwesomeIcon icon={faPowerOff} size="2xl"/>
        {powerOn ? "ON" : "OFF"}
      </button>
      </div>
      
      <div id="drum-pad-container">

        {drumPads.map((pad) => (
          <div
            key={pad.key}
            className="drum-pad"
            style={{
                pointerEvents: powerOn ? 'auto' : 'none',
                  opacity: powerOn ? 1 : 0.5,
            }}
            onClick={() => handlePadClick(pad)}
          >
            {pad.key}
            <audio className="clip" id={pad.key} src={pad.src}></audio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrumMachine;
