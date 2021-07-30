export const waves: { value: OscillatorType; label: string }[] = [
  { value: "sine", label: "Sine" },
  { value: "triangle", label: "Tri" },
  { value: "square", label: "Square" },
  { value: "sawtooth", label: "Saw" },
];

export const defaults = {
  volume: 0.5,
  muted: false,
  freq: 440,
  wave: "sine",
};
