import { v4 as uuidv4 } from "uuid";

export class BaseAudio {
  protected gain: GainNode;
  protected mute: GainNode;
  id: string;

  constructor(ctx: AudioContext, destination?: AudioNode) {
    this.gain = ctx.createGain();
    this.gain.gain.value = 0.1;

    this.mute = ctx.createGain();
    this.muted = false;

    this.gain.connect(this.mute);
    this.id = uuidv4();

    if (destination) {
      this.mute.connect(destination);
    } else {
      this.mute.connect(ctx.destination);
    }
  }

  set muted(isMuted: boolean) {
    this.mute.gain.value = isMuted ? 0 : 1;
  }

  get muted() {
    return !this.mute.gain.value;
  }

  set volume(value: number) {
    this.gain.gain.value = value;
  }

  get volume() {
    return this.gain.gain.value;
  }
}
