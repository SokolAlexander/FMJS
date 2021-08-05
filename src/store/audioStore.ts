import {
  observable,
  action,
  makeObservable,
  computed,
  reaction,
  autorun,
  when,
} from "mobx";

import audioContext from "../audio/context";
import { OscillatorStore } from "./oscillatorStore";

class AudioStore {
  audioCtx = audioContext;
  @observable started = false;
  @observable isMuted = audioContext.muted;
  @observable volume = audioContext.volume;
  // TODO consider storing it in a map
  @observable oscillators: OscillatorStore[] = []; // {[id: string]: OscillatorStore} = {};

  constructor() {
    makeObservable(this);
  }

  // starting audioCtx
  @action
  start = () => {
    this.started = true;
  };

  @action
  mute = () => {
    this.isMuted = !this.isMuted;
  };

  @action
  setVolume = (value: number) => {
    this.volume = value / 100;
  };

  @action
  addOscillator = () => {
    audioStore.oscillators.push(
      new OscillatorStore(audioContext.addOscillator())
    );
  };

  @action
  removeOscillator = (id: string) => {
    const oscToRemove = this.oscillators.find((osc) => osc.id === id);
    oscToRemove?.destroy();

    this.oscillators = this.oscillators.filter((osc) => osc.id !== id);
  };

  // @action
  // setAttack = (attack: { value: number; time: number }) => {
  //   this.envelopeData = {
  //     ...this.envelopeData,
  //     attack,
  //   };
  // };
}

const audioStore = new AudioStore();

// mute
autorun(() => {
  audioContext.muted = audioStore.isMuted;
});

// volume
autorun(
  () => {
    audioContext.volume = audioStore.volume;
  },
  {
    delay: 200,
  }
);

// start - only once
when(
  () => audioStore.started,
  () => {
    audioStore.oscillators.push(
      new OscillatorStore(audioContext.addOscillator())
    );
  }
);

export default audioStore;
