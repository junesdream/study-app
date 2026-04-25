import { Day } from "@/types";
import { getProgress } from "@/lib/helpers";

type Props = {
    calendar: Day[];
    currentMonth: number;
};

export default function Heatmap({ calendar, currentMonth }: Props) {
    const days = calendar.filter(
        (d) => new Date(d.date).getMonth() === currentMonth
    );

    return (
        <div style={{ marginBottom: "20px" }}>
            <div style={{ marginBottom: "6px", color: "#00ffaa" }}>
                Heatmap
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(14, 1fr)",
                    gap: "4px",
                }}
            >
                {days.map((day, i) => {
                    const p = getProgress(day);
                    const dateStr = day.date.toISOString().slice(0, 10);

                    const bg =
                        p > 70
                            ? "#00ff88"
                            : p > 30
                                ? "#009944"
                                : p > 0
                                    ? "#003322"
                                    : "#111";

                    return (
                        <div
                            key={i}
                            title={`${day.weekday} ${dateStr} → ${p}%`}
                            style={{
                                width: "100%",
                                height: "12px",
                                background: bg,
                                border: "1px solid #002200",
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}