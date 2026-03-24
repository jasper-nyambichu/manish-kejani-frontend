import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  endTime?: Date;
  label?: string;
}

const CountdownTimer = ({ endTime, label = "Ends in" }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = endTime || new Date(Date.now() + 8 * 60 * 60 * 1000);
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setTimeLeft({
        hours: Math.floor(diff / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endTime]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex items-center gap-2 font-body">
      <Clock className="w-4 h-4 text-primary" />
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-1">
        {[
          { val: timeLeft.hours, label: "h" },
          { val: timeLeft.minutes, label: "m" },
          { val: timeLeft.seconds, label: "s" },
        ].map((t) => (
          <span key={t.label} className="bg-surface text-surface-foreground text-sm font-bold px-2 py-0.5 rounded">
            {pad(t.val)}{t.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
