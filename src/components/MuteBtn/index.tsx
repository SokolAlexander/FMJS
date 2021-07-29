import React from "react";
import { observer } from "mobx-react";
import clns from "classnames";

import audioStore from "../../store/audioStore";
import './styles.scss';

export const MuteBtn = observer(() => {
  const { mute, isMuted } = audioStore;

  return (
    <div
      className={clns("mute__button", isMuted && "muted")}
      role="button"
      onClick={mute}
    >
      MUTE
    </div>
  );
});
