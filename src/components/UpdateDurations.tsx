import { useEffect, useState } from "react";
import { TimerSubtype, TimerType } from "../types";

export let defaultDurations: Record<
  TimerType,
  Partial<Record<TimerSubtype, number>>
> = {
  "Germany Tier 1": {
    "SAR Investigation": 7.46,
    "SAR No Investigation": 18.7,
    "XSAR Investigation": 10.74,
    "XSAR No Investigation": 8.27,
  },
  "Germany Tier 2": {
    "SAR Investigation": 22.35,
    "SAR No Investigation": 23.84,
    "XSAR Investigation": 13.08,
    "XSAR No Investigation": 9.28,
  },
  "Germany Advanced Tier 1": {
    "SAR Investigation": 7.46,
    "SAR No Investigation": 20.2,
    "XSAR Investigation": 6.54,
    "XSAR No Investigation": 8.84,
  },
  "Germany Advanced Tier 2": {
    "SAR Investigation": 20.93,
    "SAR No Investigation": 17.22,
    "XSAR Investigation": 12.83,
    "XSAR No Investigation": 11.14,
  },
  "Germany Manual Standart": {
    "Agent Referral": 27.78,
    "Significant STR": 45.19,
    "Internal Referral": 36.97,
    "Manual XReport": 18.51,
  },
  "Germany Extensive": {
    "Significant STR": 74.58,
    "Internal Referral": 67.88,
    "Manual XReport": 55.77,
  },
};

export function UpdateDurations() {
  const [durations, setDurations] = useState({} as typeof defaultDurations);

  useEffect(() => {
    const storedDurations = localStorage.getItem("storedDurations");

    if (!storedDurations) {
      setDurations(defaultDurations);
    } else {
      setDurations(JSON.parse(storedDurations));
    }
  }, []);

  const handleChange = (
    tier: TimerType,
    subtype: TimerSubtype,
    value: string
  ) => {
    const parsedValue = parseFloat(value);

    const newDurations = {
      ...durations,
      [tier]: {
        ...durations[tier],
        [subtype]: !isNaN(parsedValue) ? parsedValue : "",
      },
    };

    setDurations(newDurations);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    localStorage.setItem("storedDurations", JSON.stringify(durations));
    alert("Values updated!");
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <button type="submit" className="btn btn-primary mb-4">
        Save
      </button>
      {Object.entries(durations).map(([tier, subtypes]) => (
        <div key={tier} className="mb-3">
          <h3 className="text-primary">{tier}</h3>
          <div className="row">
            {Object.entries(subtypes!).map(([subtype, value]) => (
              <div key={subtype} className="col-md-3 mb-3">
                <div className="form-group">
                  <label className="form-label">
                    {subtype}:
                    <input
                      type="number"
                      step="0.01"
                      value={value}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        if (newValue === "" || /^\d*\.?\d*$/.test(newValue)) {
                          handleChange(
                            tier as TimerType,
                            subtype as TimerSubtype,
                            newValue
                          );
                        }
                      }}
                      className="form-control"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </form>
  );
}
