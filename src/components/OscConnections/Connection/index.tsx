import React from "react";
import { observer } from "mobx-react";

export const Connection = observer(
  ({
    id,
    connected,
    onChange,
  }: {
    id: string;
    connected: boolean;
    onChange: (id: string) => void;
  }) => {
    const handleChange = () => {
      onChange(id);
    }
    return (
      <>
        <input
          id={`cheeckbox-${id}`}
          type="checkbox"
          checked={connected}
          onChange={handleChange}
        />
        <label>{id}</label>
      </>
    );
  }
);
