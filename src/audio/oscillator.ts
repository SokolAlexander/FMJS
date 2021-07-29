import { BaseAudio } from "./baseAudio";

// accessing oscillator should be only through AudioCtx class;
export class Oscillator extends BaseAudio {
  private osc: OscillatorNode;

  constructor(ctx: AudioContext, destination: AudioNode) {
    super(ctx, destination);

    this.osc = ctx.createOscillator();
    this.osc.connect(this.gain);

    this.osc.start();
    console.log('9090909090909090');
  }
}
