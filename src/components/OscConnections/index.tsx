import React, { useMemo, useCallback } from "react";
import { observer } from "mobx-react";
import { OscillatorStore } from "../../store/oscillatorStore";
import audioStore from "../../store/audioStore";
import { Connection } from "./Connection";

export const OscillatorConnections = observer(
  ({ oscillator }: { oscillator: OscillatorStore }) => {
    const { oscillators, connect, disconnect } = audioStore;

    const activeOscs = useMemo(
      () => oscillators.filter(({ id }) => id !== oscillator.id),
      [oscillator, oscillators]
    );

    const handleChangeOsc = useCallback(
      (id) => {
        if (!oscillator.connections.includes(id)) {
          connect(oscillator.id, id);
        } else {
          disconnect(oscillator.id, id);
        }
      },
      [oscillator.id]
    );

    const handleChangeOut = useCallback(() => {
      if (oscillator.isConnectedToOut) {
        disconnect(oscillator.id);
      } else {
        connect(oscillator.id);
      }
    }, [oscillator.id]);

    return (
      <div className="connections-wrapper">
        {activeOscs.map((osc) => (
          <Connection
            key={osc.id}
            id={osc.id}
            connected={oscillator.connections.includes(osc.id)}
            onChange={handleChangeOsc}
          />
        ))}
        <Connection
          id="out"
          onChange={handleChangeOut}
          connected={oscillator.isConnectedToOut}
        />
      </div>
    );
  }
);
