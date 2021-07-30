import { BaseAudio } from "./baseAudio";

// accessing oscillator should be only through AudioCtx class;
export class Oscillator extends BaseAudio {
  private osc: OscillatorNode;

  constructor(ctx: AudioContext, destination: AudioNode) {
    super(ctx, destination);

    this.osc = ctx.createOscillator();
    this.osc.connect(this.gain);

    this.osc.start();
    console.log('started');
  }

  get wave() {
    return this.osc.type;
  }

  set wave(waveForm: OscillatorType) {
    this.osc.type = waveForm;
  }

  get freq() {
    return this.osc.frequency.value;
  }

  set freq(frequency: number) {
    this.osc.frequency.value = frequency;
  }

  destroy = () => {
    this.osc.stop();

    this.gain.disconnect();
    this.osc.disconnect();
    this.mute.disconnect();

    // delete this.gain;
    // delete this.osc;
    // delete this.mute;
  }
}
