import { Oscillator } from "./oscillator";
import { BaseAudio } from "./baseAudio";

const aCtx = new AudioContext();

class AudioCtx extends BaseAudio {
  private ctx: AudioContext;
  private oscillators: { [id: string]: Oscillator } = {};

  constructor(context: AudioContext) {
    super(context);
    this.ctx = context;
  }

  addOscillator = () => {
    const osc = new Oscillator(this.ctx, this.gain);
    this.oscillators[osc.id] = osc;
    return osc;
  }
}

export default new AudioCtx(aCtx);
