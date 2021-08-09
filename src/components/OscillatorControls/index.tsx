import React, { useState } from "react";
import { observer } from "mobx-react";
import ReactSlider from "react-slider";

import { OscillatorStore } from "../../store/oscillatorStore";
import { waves } from "../../utils/constants";
import "./styles.scss";
import { EnvelopeControls } from "../EnvelopeControls";
import { OscillatorConnections } from "../OscConnections";

export const OscillatorControls = observer(
  ({
    oscillator,
    onRemove,
  }: {
    oscillator: OscillatorStore;
    onRemove: (id: string) => void;
  }) => {
    const [showEnvelope, setShowEnvelope] = useState(false);
    const [showConnections, setShowConnections] = useState(false);
    const toggleShowEnv = () => {
      setShowEnvelope((show) => !show);
    };
    const toggleShowConnections = () => {
      setShowConnections(prev => !prev);
    }

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
    };

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
        <div onClick={toggleShowEnv}>
          {showEnvelope ? "hide envelope" : "show envelope"}
        </div>
        {showEnvelope && <EnvelopeControls oscillator={oscillator} />}
        <div onClick={toggleShowConnections}>
          {showConnections ? "hide connections" : "show connections"}
        </div>
        {showConnections && <OscillatorConnections oscillator={oscillator} />}
      </>
    );
  }
);
