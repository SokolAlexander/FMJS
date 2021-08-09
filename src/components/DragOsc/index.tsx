import React, { useRef, useEffect, forwardRef } from "react";
import { observer } from "mobx-react";
import Draggable from "react-draggable";
import clns from "classnames";

import "./styles.scss";
import audioStore from "../../store/audioStore";
import { Props } from "./types";
import { useNormalize } from "../../utils/useNormalize";

const DragOscillator = ({ onMove, osc, bounds }: Props) => {
  const dragRef = useRef<HTMLDivElement>(null);
  const maxX = useRef(1);
  const maxY = useRef(1);

  const { normalize: normFreq, denormalize: denormFreq } = useNormalize(
    0,
    maxY.current
  );

  const handleMove = (e: any, data: any) => {
    osc.setVolume(data.lastX / maxX.current!);

    const normalized = normFreq(maxY.current - data.lastY);
    osc.setFreq(normalized);
  };

  useEffect(() => {
    const drag = dragRef.current?.getBoundingClientRect();

    if (bounds && drag) {
      maxX.current = bounds.x - drag.width;
      maxY.current = bounds.y - drag.height;
    }
  }, []);

  return (
    <Draggable
      onDrag={handleMove}
      position={{
        x: osc.volume * maxX.current,
        y: maxY.current - denormFreq(osc.freq),
      }}
      bounds="parent"
      axis="both"
      defaultPosition={{
        x: osc.volume * maxX.current,
        y: maxY.current - denormFreq(osc.freq),
      }}
    >
      <div
        ref={dragRef}
        className={clns([
          "draggable__item",
          osc.isConnectedToOut && "connected",
          osc.isMuted && "muted",
        ])}
      >
        01
      </div>
    </Draggable>
  );
};

export const DragOsc = observer(DragOscillator);
