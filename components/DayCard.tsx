import { Day, Entry } from "@/types";
import { getProgress } from "@/lib/helpers";

type Props = {
    day: Day;
    updateEntry: (day: Day, entry: Entry, field: keyof Entry, value: boolean) => void;
    updateNote: (day: Day, entry: Entry, value: string) => void;
    updateWeekNote: (day: Day, value: string) => void;
};

export default function DayCard({
                                    day,
                                    updateEntry,
                                    updateNote,
                                    updateWeekNote,
                                }: Props) {
    return (
        <div
            className="card"
            style={{
                border: "1px solid #00ff88",
                padding: "12px",
                borderRadius: "6px",
                background:
                    getProgress(day) > 70
                        ? "#002200"
                        : getProgress(day) > 30
                            ? "#001100"
                            : "#000",
                boxShadow: "0 0 8px #00ff88",
            }}
        >
            {/* HEADER */}
            <strong style={{ color: "#00ff88" }}>
                {day.weekday} –{" "}
                {new Date(day.date).toLocaleDateString("de-DE")}
            </strong>

            {/* PROGRESS */}
            <div style={{ marginTop: "6px" }}>
                <div
                    style={{
                        width: "100%",
                        height: "6px",
                        background: "#001100",
                        borderRadius: "4px",
                    }}
                >
                    <div
                        style={{
                            width: `${getProgress(day)}%`,
                            height: "100%",
                            background:
                                getProgress(day) > 70
                                    ? "#00ff88"
                                    : getProgress(day) > 30
                                        ? "#88ff00"
                                        : "#444",
                        }}
                    />
                </div>

                <div style={{ fontSize: "11px", color: "#00ffaa" }}>
                    {getProgress(day)}%
                </div>
            </div>

            {/* SONNTAG */}
            {day.weekday === "Sonntag" && (
                <textarea
                    placeholder="Wochen-Review..."
                    style={{
                        width: "100%",
                        minHeight: "60px",
                        background: "#000",
                        color: "#00ff88",
                        border: "1px solid #00ff88",
                        outline: "none"
                    }}
                    value={day.weekNote || ""}
                    onChange={(e) =>
                        updateWeekNote(day, e.target.value)
                    }
                />
            )}

            {/* MODULE */}
            {day.entries.map((entry, i) => (
                <div key={i} style={{ marginTop: "10px" }}>
                    <b style={{ color: "#00ffaa" }}>{entry.module}</b>

                    <div style={{ color: "#888" }}>{entry.time}</div>

                    {/* CHECKBOX */}
                    <div style={{ display: "flex", gap: "6px" }}>
                        {(
                            ["sprechstunde", "esa", "lernen", "klausur"] as (keyof Entry)[]
                        ).map((f) => (
                            <label key={f}>
                                <input
                                    type="checkbox"
                                    style={{
                                        accentColor: "#00ff88",
                                        cursor: "pointer"
                                    }}
                                    checked={entry[f] as boolean}
                                    onChange={(e) =>
                                        updateEntry(
                                            day,
                                            entry,
                                            f,
                                            e.target.checked
                                        )
                                    }
                                />
                                {f[0].toUpperCase()}
                            </label>
                        ))}
                    </div>

                    {/* NOTE */}
                    <textarea
                        placeholder="Tages-Notiz..."
                        style={{
                            width: "100%",
                            minHeight: "60px",
                            background: "#000",
                            color: "#00ff88",
                            border: "1px solid #00ff88",
                            outline: "none"
                        }}
                        value={entry.note}
                        onChange={(e) =>
                            updateNote(day, entry, e.target.value)
                        }
                    />
                </div>
            ))}
        </div>
    );
}