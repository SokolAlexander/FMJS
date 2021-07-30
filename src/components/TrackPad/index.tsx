import React, { useRef, useEffect, useState } from "react";
import { observer } from "mobx-react";
import Draggable from "react-draggable";

import "./styles.scss";
import audioStore from "../../store/audioStore";
import { DragOsc } from "../DragOsc";

export const TrackPad = observer(() => {
  const { oscillators } = audioStore;
  const parentRef = useRef<HTMLDivElement | null>(null);
  const maxX = useRef<number | undefined>();
  const maxY = useRef<number | undefined>();
  const [bounds, setBounds] = useState({ x: 1, y: 1 });

  const onMove = (x: number, y: number) => {
    console.log(x / maxX.current!, 1 - y / maxY.current!);
  };

  useEffect(() => {
    const rect = parentRef.current?.getBoundingClientRect();

    if (rect) {
      setBounds({ x: rect.width, y: rect.height });
    }
  }, []);

  return (
    <div className="draggable__bg" ref={parentRef}>
      {oscillators.map((osc) => (
        <DragOsc key={osc.id} onMove={onMove} osc={osc} bounds={bounds} />
      ))}
    </div>
  );
});
