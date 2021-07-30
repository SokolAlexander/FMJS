import { observable, action, makeObservable, autorun } from 'mobx';

import { waves } from '../utils/constants';
import audioContext from '../audio/context';
import { Oscillator } from '../audio/oscillator';

export class OscillatorStore {
  id: string;
  osc: Oscillator;
  @observable wave: OscillatorType = waves[0].value;
  @observable freq = 440;
  @observable volume = 1;
  @observable isMuted = false;

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
  }

  @action
  mute = () => {
    this.isMuted = !this.isMuted;
  };

  @action
  setVolume = (value: number) => {
    this.volume = value / 100;
  };

  @action
  setFreq = (value: number) => {
    this.freq = value;
  };

  @action
  setWave = (wave: OscillatorType) => {
    this.wave = wave;
  };

  destroy = () => {
    this.osc.destroy();
  }
}
