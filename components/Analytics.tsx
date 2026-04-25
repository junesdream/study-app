import { Day } from "@/types";
import { getProgress } from "@/lib/helpers";

type Props = {
    calendar: Day[];
    currentMonth: number;
};

export default function Analytics({ calendar, currentMonth }: Props) {
    const days = calendar.filter(
        (d) => new Date(d.date).getMonth() === currentMonth
    );

    const progresses = days.map(getProgress);

    const avg =
        progresses.length === 0
            ? 0
            : Math.round(
                progresses.reduce((a, b) => a + b, 0) / progresses.length
            );

    const best = Math.max(...progresses, 0);
    const worst = Math.min(...progresses, 100);

    return (
        <div style={{
            marginBottom: "20px",
            color: "#00ffaa",
            padding: "10px",
            border: "1px solid #003322",
            borderRadius: "6px",
            boxShadow: "0 0 6px #00ff88"
        }}>
            <div>Ø Progress: {avg}%</div>
            <div>
                Status: {avg > 70 ? "🔥 Stark" : avg > 30 ? "⚡ OK" : "❗ Low"}
            </div>
            <div>Best: {best}%</div>
            <div>Worst: {worst}%</div>
        </div>
    );
}