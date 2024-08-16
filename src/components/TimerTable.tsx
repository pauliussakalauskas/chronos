import { Timer, TimerSubtype } from "../types";
import { formatDate } from "../utils";

type TimerTableProps = {
  timers: Timer[];
  onStopTimer: (id: number, subtype: TimerSubtype) => void;
  onPauseTimer: (id: number) => void;
  onResumeTimer: (id: number) => void;
  onTimerDelete: (id: number) => void;
};

const subtypes: { [key: string]: TimerSubtype[] }[] = [
  {
    "Germany Tier 1": [
      "SAR Investigation",
      "SAR No Investigation",
      "XSAR Investigation",
      "XSAR No Investigation",
    ],
  },
  {
    "Germany Advanced Tier 1": [
      "SAR Investigation",
      "SAR No Investigation",
      "XSAR Investigation",
      "XSAR No Investigation",
    ],
  },
  {
    "Germany Tier 2": [
      "SAR Investigation",
      "SAR No Investigation",
      "XSAR Investigation",
      "XSAR No Investigation",
    ],
  },
  {
    "Germany Advanced Tier 2": [
      "SAR Investigation",
      "SAR No Investigation",
      "XSAR Investigation",
      "XSAR No Investigation",
    ],
  },
  {
    "Germany Manual Standart": [
      "Internal Referral",
      "Manual XReport",
      "Significant STR",
    ],
  },
  {
    "Germany Extensive": [
      "Agent Referral",
      "Internal Referral",
      "Manual XReport",
      "Significant STR",
    ],
  },
];

export function TimerTable({
  timers,
  onStopTimer,
  onPauseTimer,
  onResumeTimer,
  onTimerDelete,
}: TimerTableProps) {
  const getSubtypes = (type: string) => {
    const subtype = subtypes.find((subtype) => subtype[type]);
    return subtype ? subtype[type] : [];
  };

  return (
    <div className="container" style={{ paddingTop: "50px" }}>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Case Type</th>
            <th>Start</th>
            <th>End</th>
            <th>Duration</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {timers.map((timer) => {
            const subs = getSubtypes(timer.type);
            return (
              <tr key={timer.id}>
                <td>{timer.id}</td>
                <td>{`${timer.type}${" "}${timer.subtype}`}</td>
                <td>{formatDate(timer.start)}</td>
                <td>{timer.end ? formatDate(timer.end) : "-"}</td>
                <td>
                  {timer.duration === "00:00:00"
                    ? "00:00:00"
                    : timer.duration.slice(11, 19)}
                </td>
                <td>
                  {!timer.end ? (
                    <div className="row">
                      <div className="col-4 p-0 dropdown">
                        <button
                          className="btn btn-danger dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          disabled={!timer.isRunning}
                        >
                          Stop
                        </button>
                        <ul className="dropdown-menu">
                          {subs.map((sub, index) => (
                            <li key={index}>
                              <button
                                className="dropdown-item"
                                onClick={() => onStopTimer(timer.id, sub)}
                              >
                                {sub}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-4 p-0">
                        {timer.isRunning ? (
                          <button
                            className={`btn btn-primary`}
                            onClick={() => onPauseTimer(timer.id)}
                          >
                            Pause
                          </button>
                        ) : (
                          <button
                            className={`btn btn-success`}
                            onClick={() => onResumeTimer(timer.id)}
                          >
                            Resume
                          </button>
                        )}
                      </div>
                      <div className="col-4 p-0">
                        <button
                          className={`btn btn-secondary`}
                          onClick={() => onTimerDelete(timer.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
