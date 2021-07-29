import React from "react";
import ReactSlider from "react-slider";

import "./styles.scss";
import { observer } from "mobx-react";
import audioStore from "../../store/audioStore";

export const Slider = observer(() => {
  const { volume, setVolume } = audioStore; 
  return (
    <ReactSlider
      ariaLabelledby="slider-label"
      className="horizontal-slider"
      thumbClassName="slider-thumb"
      trackClassName="slider-track"
      onChange={setVolume}
      value={volume * 100}
      // renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
    />
  );
});
