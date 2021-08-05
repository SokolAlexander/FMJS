import React, { useRef, useEffect, useMemo } from "react";
import { observer } from "mobx-react";
import audioStore from "../../store/audioStore";
import { normalize } from "../../utils/normalize";
import Draggable from "react-draggable";
import { EnvelopeDot } from "./EnvelopeDot";

export const EnvelopeControls = observer(() => {
  const { oscillators } = audioStore;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtx = useRef<CanvasRenderingContext2D | null>(null);
  const canvasWidth = useRef<number>(400);
  const canvasHeight = useRef<number>(300);
  const canvasTop = useRef<number>(0);
  const canvasLeft = useRef<number>(0);
  const canvasBottom = useRef<number>(0);
  const canvasRight = useRef<number>(0);

  useEffect(() => {
    canvasCtx.current = canvasRef.current?.getContext(
      "2d"
    ) as CanvasRenderingContext2D;

    const rect = canvasRef.current?.getBoundingClientRect();
    canvasWidth.current = rect?.width || 1;
    canvasHeight.current = rect?.height || 1;
    canvasBottom.current = rect?.bottom || 1;
    canvasTop.current = rect?.top || 1;
    canvasLeft.current = rect?.left || 1;
    canvasRight.current = rect?.right || 1;
    canvasCtx.current.clearRect(
      0,
      0,
      canvasWidth.current,
      canvasHeight.current
    );
    canvasCtx.current.fillStyle = "white";
    canvasCtx.current.fillRect(0, 0, canvasWidth.current, canvasHeight.current);
  }, []);

  const drawEnvelope = () => {
    const ctx = canvasCtx.current;
    ctx!.clearRect(0, 0, canvasWidth.current, canvasHeight.current);
    ctx!.fillStyle = "white";
    ctx!.fillRect(0, 0, canvasWidth.current, canvasHeight.current);
    ctx!.fillStyle = "black";
    ctx!.lineWidth = 2;
    ctx!.beginPath();

    ctx!.moveTo(0, 0);

    oscillators[0].envelopeMtrx.forEach((el, i) => {
      ctx!.lineTo(
        i * (canvasWidth.current / oscillators[0].envelopeMtrx.length),
        (1 - el) * canvasHeight.current
      );
    });

    ctx!.stroke();
  };

  useEffect(() => {
    if (!oscillators[0]?.envelopeMtrx) {
      return;
    }

    drawEnvelope();
  }, [oscillators[0]?.envelopeMtrx]);

  const onPointMove = (name: string, time: number, value: number) => {
    oscillators[0]!.setEnvDot(name, { time, value });
    drawEnvelope();
  };

  const timeCoef = useMemo(
    () => canvasWidth.current / oscillators[0]?.envelopeMtrx.length,
    [canvasWidth, oscillators[0]?.envelopeMtrx]
  );
  const gainCoef = useMemo(() => -canvasHeight.current, [canvasHeight]);

  const envPoints = useMemo(() => {
    return oscillators[0]?.envelopeData
      ? Object.entries(oscillators[0]?.envelopeData)
      : [];
  }, [oscillators[0]?.envelopeData]);

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "406px",
          height: "306px",
          border: "2px solid red",
        }}
      >
        <canvas
          id="canvas__env"
          style={{ border: "3px solid green", position: "relative" }}
          width="400px"
          height="300px"
          ref={canvasRef}
        />
        {envPoints.map(
          ([key, point], i) =>
            i !== envPoints.length - 1 && (
              <EnvelopeDot
                point={point}
                prevPoint={envPoints[i - 1]?.[1] || null}
                nextPoint={envPoints[i + 1]?.[1] || null}
                parentHeight={canvasHeight.current}
                parentLeft={canvasLeft.current}
                parentRight={canvasRight.current}
                timeCoef={timeCoef}
                gainCoef={gainCoef}
                onMove={onPointMove}
                key={i}
                name={key}
              />
            )
        )}
      </div>
      {oscillators[0]?.envelope && (
        <>
          <div>
            {oscillators[0].envelope.attack.time} :
            {oscillators[0].envelope.attack.value}
          </div>
          <div>
            {oscillators[0].envelope.sustain.time} :
            {oscillators[0].envelope.sustain.value}
          </div>
          <div>
            {oscillators[0].envelope.release.time} :
            {oscillators[0].envelope.release.value}
          </div>
        </>
      )}
    </>
  );
});
