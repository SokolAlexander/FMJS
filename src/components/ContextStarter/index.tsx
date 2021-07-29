import React from "react";
import { observer } from "mobx-react";

import audioStore from "../../store/audioStore";
import "./styles.scss";

export const ContextStarter = observer(() => {
  const { started, start } = audioStore;

  if (started) {
    return null;
  }

  return (
    <div className="blocker">
      <div className="button" role="button" onClick={start}>START</div>
    </div>
  );
});