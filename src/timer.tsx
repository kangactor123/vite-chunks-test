import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  initialTime: number;
};

const INTERVAL_TIME = 1000; //1s

type TIMER_ACTION = "START" | "STOP" | "RESET";

const Timer: React.FC<Props> = ({ initialTime }) => {
  const [time, setTime] = useState(initialTime);
  const [timerStatus, setTimerStatus] = useState<TIMER_ACTION>("STOP");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const onClickButton = (status: TIMER_ACTION) => {
    const action: Record<TIMER_ACTION, () => void> = {
      RESET: onReset,
      START: onTimerStart,
      STOP: onTimerStop,
    };

    setTimerStatus(status);
    action[status]();
  };

  const onTimerStop = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    setTime((previousTime) => {
      if (previousTime === 0) {
        onTimerStop();
        return 0;
      }
      return previousTime - 1;
    });
  }, [onTimerStop]);

  const onTimerStart = useCallback(() => {
    if (timerRef.current !== null) return;
    timerRef.current = setInterval(tick, INTERVAL_TIME);
  }, [tick]);

  const onReset = useCallback(() => {
    onTimerStop();
    setTime(initialTime);
  }, [initialTime, onTimerStop]);

  const disableStop = timerStatus === "STOP";
  const disableStart = timerStatus === "START";

  useEffect(() => {
    onTimerStart();
    return onTimerStop();
  }, [onTimerStart, onTimerStop]);

  return (
    <div>
      <span>{time}초</span>
      <button onClick={() => onClickButton("RESET")}>reset</button>
      <button onClick={() => onClickButton("STOP")} disabled={disableStop}>
        stop
      </button>
      <button onClick={() => onClickButton("START")} disabled={disableStart}>
        start
      </button>
    </div>
  );
};

export default Timer;
