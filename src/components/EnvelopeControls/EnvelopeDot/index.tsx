import React, { useMemo, useCallback } from "react";
import Draggable from "react-draggable";

type Props = {
  point: {
    time: number;
    value: number;
  };
  nextPoint: {
    time: number;
  } | null;
  prevPoint: {
    time: number;
  } | null;
  onMove: (name: string, time: number, value: number) => void;
  parentLeft: number;
  parentRight: number;
  parentHeight: number;
  timeCoef: number;
  gainCoef: number;
  name: string;
};

export const EnvelopeDot = (props: Props) => {
  const {
    parentLeft,
    parentHeight,
    timeCoef,
    gainCoef,
    point,
    prevPoint,
    nextPoint,
    onMove,
    parentRight,
    name,
  } = props;

  const bounds = useMemo(() => {
    return {
      left: prevPoint ? (prevPoint.time || 0) * timeCoef + 2 : parentLeft + 1,
      top: -parentHeight - 18,
      bottom: -18,
      right: nextPoint
        ? (nextPoint.time || 600) * timeCoef - 2
        : parentRight - 1,
    };
  }, [parentLeft, parentHeight, nextPoint, timeCoef, parentRight, prevPoint]);

  const position = {
    x: point.time * timeCoef,
    y: point.value * gainCoef,
  };

  const handleStop = useCallback(
    (e: any, data: any) => {
      onMove(name, data.lastX / timeCoef, data.lastY / gainCoef);
    },
    [onMove, timeCoef, gainCoef, name]
  );

  return (
    <Draggable bounds={bounds} position={position} onStop={handleStop}>
      <div style={{ width: "10px", height: "10px", border: "2px solid red" }} />
    </Draggable>
  );
};
