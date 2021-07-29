import { Oscillator } from "./oscillator";
import { BaseAudio } from "./baseAudio";

const aCtx = new AudioContext();

class AudioCtx extends BaseAudio {
  private ctx: AudioContext;
  private oscillators: Oscillator[] = [];

  constructor(context: AudioContext) {
    super(context);
    this.ctx = context;
  }

  start = () => {
    const osc = new Oscillator(this.ctx, this.gain);
    this.oscillators.push(osc);
  }
}

export default new AudioCtx(aCtx);