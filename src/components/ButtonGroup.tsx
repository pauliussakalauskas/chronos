import React from "react";
import { TimerType } from "../types";

type ButtonGroupProps = {
  onAddTimer: (type: TimerType) => void;
};

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ onAddTimer }) => {
  const types: TimerType[] = [
    "Germany Tier 1",
    "Germany Advanced Tier 1",
    "Germany Tier 2",
    "Germany Advanced Tier 2",
    "Germany Manual Standart",
    "Germany Extensive",
  ];

  const buttonTypes = [
    "btn-danger",
    "btn-danger",
    "btn-warning",
    "btn-warning",
    "btn-success",
    "btn-primary",
  ];

  return (
    <div
      className="btn-group"
      role="group"
      aria-label="Basic mixed styles example"
    >
      {types.map((type, index) => (
        <button
          key={type}
          type="button"
          className={`btn ${buttonTypes[index % buttonTypes.length]}`}
          onClick={() => onAddTimer(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
};
