import { OscillatorStore } from "../../store/oscillatorStore";

export type Props = {
  onMove: (x: number, y: number) => void;
  osc: OscillatorStore;
  bounds: {
    x: number;
    y: number;
  };
};
