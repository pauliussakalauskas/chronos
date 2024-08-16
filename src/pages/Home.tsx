import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useCallback, useEffect, useState } from "react";
import {
  ButtonGroup,
  defaultDurations,
  SummaryTable,
  TimerTable,
} from "../components";
import { Timer, TimerSubtype, TimerType } from "../types";
import { calculateEfficiency } from "../utils";

export function HomePage() {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [pauseStart, setPauseStart] = useState<Date | null>(null);
  const [durations, setDurations] = useState({} as typeof defaultDurations);
  const [summary, setSummary] = useState({
    totalDuration: 0,
    totalCaseCount: 0,
    totalEfficiency: 0,
  });

  useEffect(() => {
    const storedDurations = localStorage.getItem("storedDurations");
    if (storedDurations) {
      setDurations(JSON.parse(storedDurations));
    } else {
      localStorage.setItem("storedDurations", JSON.stringify(defaultDurations));
    }
  }, []);

  const handleAddTimer = useCallback(
    (type: TimerType) => {
      if (timers.some((timer) => timer.isRunning) || pauseStart) {
        alert("Please stop the running timer before adding a new one.");
        return;
      }

      const newTimer: Timer = {
        id: timers.length + 1,
        type,
        start: new Date().toISOString(),
        duration: "00:00:00",
        isRunning: true,
        pausedDuration: 0,
        subtype: "",
      };

      setTimers((prevTimers) => [...prevTimers, newTimer]);
    },
    [timers, pauseStart]
  );

  const handleDeleteTimer = useCallback(
    (id: number) => {
      setTimers((prevTimers) => prevTimers.filter((timer) => timer.id !== id));
      setPauseStart(null);
    },
    [setTimers]
  );

  const updateSummary = useCallback(
    (timers: Timer[]) => {
      let durationInSeconds = 0;
      let totalCaseCount = 0;
      let totalEfficiency = 0;

      timers.forEach((timer) => {
        const durationDate = new Date(timer.duration);
        const timerDurationInSeconds = Math.floor(
          durationDate.getTime() / 1000
        );
        durationInSeconds += timerDurationInSeconds;
        totalCaseCount += 1;
        totalEfficiency += timer.efficiency || 0;
      });

      setSummary(() => ({
        totalDuration: durationInSeconds,
        totalCaseCount: totalCaseCount,
        totalEfficiency: totalEfficiency / totalCaseCount,
      }));
    },
    [setSummary]
  );

  const handleStopTimer = useCallback(
    (id: number, subtype: TimerSubtype) => {
      setTimers((prevTimers) => {
        const updatedTimers = prevTimers.map((timer) => {
          if (timer.id === id) {
            const updatedTimer = {
              ...timer,
              subtype,
              end: new Date().toISOString(),
              isRunning: false,
              efficiency:
                calculateEfficiency(
                  timer.type,
                  subtype,
                  timer.duration,
                  durations
                ) || 0,
            };
            return updatedTimer;
          }
          return timer;
        });

        updateSummary(updatedTimers);

        return updatedTimers;
      });
    },
    [setTimers, durations, updateSummary]
  );

  const handlePauseTimer = useCallback(
    (id: number) => {
      setPauseStart(new Date());

      setTimers((prevTimers) =>
        prevTimers.map((timer) =>
          timer.id === id
            ? {
                ...timer,
                isRunning: false,
              }
            : timer
        )
      );
    },
    [setTimers, setPauseStart]
  );

  const handleResumeTimer = useCallback(
    (id: number) => {
      const now = new Date();
      const pauseDuration = pauseStart
        ? now.getTime() - pauseStart.getTime()
        : 0;
      setTimers((prevTimers) =>
        prevTimers.map((timer) => {
          if (timer.id === id) {
            return {
              ...timer,
              isRunning: true,
              pausedDuration: (timer.pausedDuration || 0) + pauseDuration,
            };
          }
          return timer;
        })
      );
      setPauseStart(null);
    },
    [pauseStart, setTimers, setPauseStart]
  );

  const updateDurations = useCallback(() => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) => {
        if (timer.isRunning) {
          const now = new Date();
          const start = new Date(timer.start);
          const pausedDuration = timer.pausedDuration || 0;
          const duration = new Date(
            now.getTime() - start.getTime() - pausedDuration
          ).toISOString();

          return { ...timer, duration };
        }
        return timer;
      })
    );
  }, [setTimers]);

  useEffect(() => {
    if (!pauseStart) {
      const interval = setInterval(updateDurations, 1000);
      return () => clearInterval(interval);
    } else if (pauseStart === null) {
      setPauseStart(new Date());
    }
  }, [timers, pauseStart, updateDurations]);

  return (
    <div className="container" style={{ paddingTop: "50px" }}>
      <ButtonGroup onAddTimer={handleAddTimer} />
      <TimerTable
        timers={timers}
        onTimerDelete={handleDeleteTimer}
        onStopTimer={handleStopTimer}
        onPauseTimer={handlePauseTimer}
        onResumeTimer={handleResumeTimer}
      />
      <SummaryTable summary={summary} />
    </div>
  );
}
