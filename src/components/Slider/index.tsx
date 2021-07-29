import React from 'react';
import ReactSlider from "react-slider";

export const Slider = () => {
  return (
    <ReactSlider
      ariaLabelledby="slider-label"
      className="horizontal-slider"
      thumbClassName="example-thumb"
      trackClassName="example-track"
      // renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
    />
  );
}