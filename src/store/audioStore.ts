import { observable, action, makeObservable, computed, reaction, autorun, when } from 'mobx';

import audioContext from '../audio/context';

class AudioStore {
  audioCtx = audioContext;
  @observable started = false;
  @observable isMuted = audioContext.muted;

  constructor() {
    makeObservable(this);
  }

  // starting audioCtx
  @action
  start = () => {
    this.started = true;
  }

  @action
  mute = () => {
    this.isMuted = !this.isMuted;
  }
}

const audioStore = new AudioStore();

autorun(() => {
  audioContext.muted = audioStore.isMuted;
});

when(() => audioStore.started, () => {
  audioContext.start();
});

export default audioStore;


