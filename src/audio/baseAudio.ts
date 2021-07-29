export class BaseAudio {
  protected gain: GainNode;
  protected mute: GainNode;

  constructor(ctx: AudioContext, destination?: AudioNode) {
    this.gain = ctx.createGain();
    this.gain.gain.value = 0.1;

    this.mute = ctx.createGain();
    this.muted = false;

    this.gain.connect(this.mute);

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
