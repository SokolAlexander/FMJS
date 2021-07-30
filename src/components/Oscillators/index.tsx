import React from "react";
import { observer } from "mobx-react";

import audioStore from "../../store/audioStore";
import { OscillatorControls } from "../OscillatorControls";

export const Oscillators = observer(() => {
  const { oscillators, addOscillator, removeOscillator } = audioStore;

  return (
    <>
      {oscillators.map((osc) => (
        <OscillatorControls
          key={osc.id}
          oscillator={osc}
          onRemove={removeOscillator}
        />
      ))}
      <div className="oscillator-controls" onClick={addOscillator}>
        ADD NeW
      </div>
    </>
  );
});
