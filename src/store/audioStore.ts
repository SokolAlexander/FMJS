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

class AudioStore {
  audioCtx = audioContext;
  @observable started = false;
  @observable isMuted = audioContext.muted;
  @observable volume = audioContext.volume;

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
    audioContext.start();
  }
);

export default audioStore;
