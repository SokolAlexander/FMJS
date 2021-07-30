import React, { useRef, useEffect, forwardRef } from "react";
import { observer } from "mobx-react";
import Draggable from "react-draggable";

import "./styles.scss";
import audioStore from "../../store/audioStore";
import { Props } from "./types";

const DragOscillator = ({ onMove, osc, bounds }: Props) => {
  const dragRef = useRef<HTMLDivElement>(null);
  const maxX = useRef(1);
  const maxY = useRef(1);

  const handleMove = (e: any, data: any) => {
    console.log(data.lastX / maxX.current!, 1 - data.lastY / maxY.current);
    osc.setVolume(data.lastX / maxX.current!);
    osc.setFreq((1 - data.lastY / maxY.current) * 16000);
  };

  // freq = (1 - y / maxY.current) * (20000 - 20)
  // y = (freq / (20000 - 20) - 1) * (-maxY.current)

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
        y: (osc.freq / 16000 - 1) * -maxY.current,
      }}
      bounds="parent"
      axis="both"
    >
      <div ref={dragRef} className="draggable__item">
        01
      </div>
    </Draggable>
  );
};

export const DragOsc = observer(DragOscillator);
