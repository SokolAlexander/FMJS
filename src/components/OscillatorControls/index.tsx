import React from "react";
import { observer } from "mobx-react";

import { OscillatorStore } from "../../store/oscillatorStore";
import { waves } from "../../utils/constants";
import './styles.scss';
import ReactSlider from "react-slider";

export const OscillatorControls = observer(
  ({
    oscillator,
    onRemove,
  }: {
    oscillator: OscillatorStore;
    onRemove: (id: string) => void;
  }) => {
    const handleChangeFreq = (e: React.ChangeEvent<HTMLInputElement>) => {
      oscillator.setFreq(+e.target.value);
    };
    const handleChangeWave = (e: React.ChangeEvent<HTMLSelectElement>) => {
      oscillator.setWave(e.target.value as OscillatorType);
    };
    const handleMute = () => {
      oscillator.mute();
    };

    const handleRemove = () => {
      onRemove(oscillator.id);
    };

    return (
      <div className="oscillator-controls">
        <input
          type="number"
          value={oscillator.freq}
          onChange={handleChangeFreq}
        />
        <div
          style={{ backgroundColor: oscillator.isMuted ? "red" : "white" }}
          onClick={handleMute}
        >
          MUTE
        </div>
        <select onChange={handleChangeWave}>
          {waves.map((w) => (
            <option key={w.value} value={w.value}>
              {w.label}
            </option>
          ))}
        </select>
        <ReactSlider
          className="slider"
          thumbClassName="slider-thumb"
          trackClassName="slider-track"
          value={oscillator.volume * 100}
          onChange={oscillator.setVolume}
        />
        <h4 onClick={handleRemove}>REMOVE</h4>
      </div>
    );
  }
);