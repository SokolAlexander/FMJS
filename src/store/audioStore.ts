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

  @action
  connect = (oscId: string, destOscId?: string) => {
    const osc = this.oscillators.find(({ id }) => id === oscId);

    if (!osc) {
      return
    }

    if (!destOscId) {
      osc.connect();
      return
    }

    const destOsc = this.oscillators.find(({ id }) => id === destOscId);
    osc.connect(destOsc);
  }

  @action
  disconnect = (oscId: string, destOscId?: string) => {
    console.log('oscId', oscId);
    const osc = this.oscillators.find(({ id }) => id === oscId);

    if (!osc) {
      return
    }

    if (!destOscId) {
      osc.disconnect();
      return
    }

    const destOsc = this.oscillators.find(({ id }) => id === destOscId);
    osc.disconnect(destOsc);
  }
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
