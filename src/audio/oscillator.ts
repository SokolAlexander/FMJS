import { BaseAudio } from "./baseAudio";
import { EnvelopeData } from "../store/types";

// accessing oscillator should be only through AudioCtx class;
export class Oscillator extends BaseAudio {
  private osc: OscillatorNode;
  private dest: AudioNode;
  private envelopeGain: GainNode;
  // for modifying modulation of other oscs
  private modGain: GainNode;
  private envelopeData: EnvelopeData = {
    attack: {
      time: 300,
      value: 1,
    },
    sustain: {
      time: 600,
      value: 1,
    },
    release: {
      time: 1000,
      value: 0.1,
    },
  };
  private envMatrix: number[] = [];
  private envelopeInterval?: NodeJS.Timeout;

  constructor(ctx: AudioContext, destination: AudioNode) {
    super(ctx, destination);

    this.osc = ctx.createOscillator();
    this.envelopeGain = ctx.createGain();
    this.modGain = ctx.createGain();
    this.osc.connect(this.envelopeGain);
    this.envelopeGain.connect(this.gain);
    this.envelopeGain.connect(this.modGain);

    this.dest = destination;

    this.osc.start();
    this.createEnvMatrix();
    this.startEnvInterval();

    // TODO this is just a simple test
    this.modGain.gain.value = 3000;
  }

  private createEnvMatrix() {
    this.envMatrix = [];
    const attackCoeff =
      this.envelopeData.attack.value / this.envelopeData.attack.time;
    const sustainCoeff =
      (this.envelopeData.sustain.value - this.envelopeData.attack.value) /
      (this.envelopeData.sustain.time - this.envelopeData.attack.time);
    const releaseCoeff =
      (this.envelopeData.release.value - this.envelopeData.sustain.value) /
      (this.envelopeData.release.time - this.envelopeData.sustain.time);

    let i = 0;

    for (; i < this.envelopeData.attack.time; i++) {
      const volume = i * attackCoeff;
      this.envMatrix.push(volume);
    }

    const lastAttackVolume = this.envMatrix[
      Math.floor(this.envelopeData.attack.time) - 1
    ];

    for (; i < this.envelopeData.sustain.time; i++) {
      const volume =
        lastAttackVolume +
        (i - this.envelopeData.attack.time - 1) * sustainCoeff;
      this.envMatrix.push(volume);
    }

    const lastSustainVolume = this.envMatrix[
      Math.floor(this.envelopeData.sustain.time) - 1
    ];

    for (; i < this.envelopeData.release.time; i++) {
      const volume =
        lastSustainVolume + (i - this.envelopeData.sustain.time) * releaseCoeff;
      this.envMatrix.push(volume);
    }
  }

  private startEnvInterval() {
    let startTime = Date.now();
    this.envelopeInterval = setInterval(() => {
      if (Date.now() - startTime >= this.envMatrix.length) {
        startTime = Date.now();
      }
      this.envelopeGain.gain.value = this.envMatrix[Date.now() - startTime];
    }, 10);
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

  set envelope(data: EnvelopeData) {
    this.envelopeData = data;
    this.createEnvMatrix();
  }

  get envelope() {
    return this.envelopeData;
  }
  get envelopeMtrx(): number[] {
    return this.envMatrix;
  }

  destroy = () => {
    this.osc.stop();

    this.gain.disconnect();
    this.osc.disconnect();
    this.mute.disconnect();

    if (this.envelopeInterval) {
      clearInterval(this.envelopeInterval);
    }

    // delete this.gain;
    // delete this.osc;
    // delete this.mute;
  };

  connectToOut() {
    this.mute.connect(this.dest);
  }

  connectToOsc(destOsc: OscillatorNode) {
    console.log('connecting to osc', destOsc);
    // destOsc.detune.value = 100;

    this.modGain.connect(destOsc.detune);
  }

  disconnectOut() {
    this.mute.disconnect(this.dest);
  }

  disconnectOsc(destOsc: OscillatorNode) {
    // destOsc.detune.value = 0;

    this.modGain.disconnect(destOsc.detune);
  }

  get oscNode() {
    return this.osc;
  }

  set modIndex(value: number) {
    this.modGain.gain.value = value;
  }

  get modIndex() {
    return this.modGain.gain.value;
  }
}
