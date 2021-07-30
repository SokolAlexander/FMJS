import React from "react";

import { Slider } from "../Slider";
import { MuteBtn } from "../MuteBtn";
import { Oscillators } from "../Oscillators";
import { TrackPad } from "../TrackPad";

export const Synth = () => (
  <>
    <Slider />
    <MuteBtn />
    <Oscillators />
    <TrackPad />
  </>
);
