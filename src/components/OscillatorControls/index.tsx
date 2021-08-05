import React from "react";
import { observer } from "mobx-react";

import { OscillatorStore } from "../../store/oscillatorStore";
import { waves } from "../../utils/constants";
import './styles.scss';
import ReactSlider from "react-slider";
import { EnvelopeControls } from "../EnvelopeControls";

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
    const handleChangeVolume = (value: number) => {
      oscillator.setVolume(value / 100);
    }

    const handleRemove = () => {
      onRemove(oscillator.id);
    };

    return (
      <>
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
            onChange={handleChangeVolume}
          />
          <h4 onClick={handleRemove}>REMOVE</h4>
        </div>
        <EnvelopeControls />
      </>
    );
  }
);
