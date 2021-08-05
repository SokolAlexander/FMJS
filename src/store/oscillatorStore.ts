import { observable, action, makeObservable, autorun } from "mobx";

import { waves } from "../utils/constants";
import audioContext from "../audio/context";
import { Oscillator } from "../audio/oscillator";
import { EnvelopeData } from "./types";

export class OscillatorStore {
  id: string;
  osc: Oscillator;
  @observable wave: OscillatorType = waves[0].value;
  @observable freq = 440;
  @observable volume = 1;
  @observable isMuted = false;
  @observable envelopeData: EnvelopeData = {
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

  constructor(osc: Oscillator) {
    makeObservable(this);
    this.osc = osc;
    this.id = `${this.osc.id}-store`;

    autorun(() => {
      this.osc.freq = this.freq;
    });
    autorun(() => {
      this.osc.volume = this.volume;
    });
    autorun(() => {
      this.osc.wave = this.wave;
    });
    autorun(() => {
      this.osc.muted = this.isMuted;
    });
    autorun(() => {
      this.osc.envelope = this.envelopeData;
      console.log("autorun");
    });
  }

  @action
  mute = () => {
    this.isMuted = !this.isMuted;
  };

  @action
  setVolume = (value: number) => {
    this.volume = value;
  };

  @action
  setFreq = (value: number) => {
    this.freq = value;
  };

  @action
  setWave = (wave: OscillatorType) => {
    this.wave = wave;
  };

  @action
  setEnvelope = (data: EnvelopeData) => {
    this.envelopeData = data;
  };

  @action
  setEnvDot = (name: string, dot: { value: number; time: number }) => {
    this.envelopeData = {
      ...this.envelopeData,
      [name]: dot,
    };
  };

  @action
  setAttack = (attack: { value: number; time: number }) => {
    this.envelopeData = {
      ...this.envelopeData,
      attack,
    };
  };

  get envelopeMtrx() {
    return this.osc.envelopeMtrx;
  }

  get envelope() {
    return this.envelopeData;
  }

  destroy = () => {
    this.osc.destroy();
  };
}
