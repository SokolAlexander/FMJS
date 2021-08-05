// export type OscillatorData = {
//   id: string;
//   wave: OscillatorType;
//   freq: number;
//   volume: number;
//   muted: boolean;
//   attack: EnvelopePoint;
//   sustain: EnvelopePoint;
//   release: EnvelopePoint;
// }

export type EnvelopePoint = {
  time: number;
  value: number;
};

export type EnvelopeData = {
  attack: EnvelopePoint;
  sustain: EnvelopePoint;
  release: EnvelopePoint;
};
