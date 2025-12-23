import { useState, useEffect, useCallback } from "react";

const KEY_MAP = {
  a: "C",
  w: "C#",
  s: "D",
  e: "D#",
  d: "E",
  f: "F",
  t: "F#",
  g: "G",
  y: "G#",
  h: "A",
  u: "A#",
  j: "B",
  k: "C2",
};

export default function VirtualPiano() {
  const [activeKey, setActiveKey] = useState(null);

  const notes = [
    { name: "C", type: "white", freq: 261.63, key: "a" },
    { name: "C#", type: "black", freq: 277.18, key: "w" },
    { name: "D", type: "white", freq: 293.66, key: "s" },
    { name: "D#", type: "black", freq: 311.13, key: "e" },
    { name: "E", type: "white", freq: 329.63, key: "d" },
    { name: "F", type: "white", freq: 349.23, key: "f" },
    { name: "F#", type: "black", freq: 369.99, key: "t" },
    { name: "G", type: "white", freq: 392.00, key: "g" },
    { name: "G#", type: "black", freq: 415.30, key: "y" },
    { name: "A", type: "white", freq: 440.00, key: "h" },
    { name: "A#", type: "black", freq: 466.16, key: "u" },
    { name: "B", type: "white", freq: 493.88, key: "j" },
    { name: "C2", type: "white", freq: 523.25, key: "k" },
  ];

  const playSound = useCallback((freq, noteName) => {
    setActiveKey(noteName);

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = freq;

    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.4, audioCtx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioCtx.currentTime + 0.8
    );

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.8);

    setTimeout(() => setActiveKey(null), 200);
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      const noteName = KEY_MAP[event.key.toLowerCase()];
      if (noteName) {
        const note = notes.find((n) => n.name === noteName);
        if (note && activeKey !== note.name) {
          playSound(note.freq, note.name);
        }
      }
    },
    [notes, playSound, activeKey]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="piano-container">
      <div className="relative flex justify-center">
        {notes.map((note) => {
          const isWhite = note.type === "white";
          const isActive = activeKey === note.name;

          return (
            <div
              key={note.name}
              onMouseDown={() => playSound(note.freq, note.name)}
              className={`piano-key ${isWhite ? "white" : "black"} ${
                isActive ? "active" : ""
              }`}
            >
              <span className="key-label">{note.key}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}