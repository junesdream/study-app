"use client";

import { useState, useEffect } from "react";
import { generateDays } from "@/lib/generateDays";
import { Day, Entry } from "@/types";
import { buildWeeks } from "@/lib/helpers";
import WeekSummary from "@/components/WeekSummary";
import DayCard from "@/components/DayCard";
import Heatmap from "@/components/Heatmap";
import Analytics from "@/components/Analytics";

export default function Home() {

    useEffect(() => {
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", () => {
                navigator.serviceWorker.register("/sw.js");
            });
        }
    }, []);

    const [calendar, setCalendar] = useState<Day[]>(generateDays());
    const [currentMonth, setCurrentMonth] = useState(2);

    const weeks = buildWeeks(calendar, currentMonth);

    /* ===================== LOCAL STORAGE ===================== */

    useEffect(() => {
        const saved = localStorage.getItem("calendar");
        if (saved) {
            const parsed = JSON.parse(saved);

            const fixed = parsed.map((d: any) => ({
                ...d,
                date: new Date(d.date),
            }));

            setCalendar(fixed);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("calendar", JSON.stringify(calendar));
    }, [calendar]);

    /* ===================== UPDATE ===================== */

    const updateEntry = (
        day: Day,
        entry: Entry,
        field: keyof Entry,
        value: boolean
    ) => {
        setCalendar((prev) =>
            prev.map((d) => {
                if (d.date.toISOString() !== day.date.toISOString()) return d;

                return {
                    ...d,
                    entries: d.entries.map((en) =>
                        en.module === entry.module
                            ? { ...en, [field]: value }
                            : en
                    ),
                };
            })
        );
    };

    const updateNote = (day: Day, entry: Entry, value: string) => {
        setCalendar((prev) =>
            prev.map((d) => {
                if (d.date.toISOString() !== day.date.toISOString()) return d;

                return {
                    ...d,
                    entries: d.entries.map((en) =>
                        en.module === entry.module
                            ? { ...en, note: value }
                            : en
                    ),
                };
            })
        );
    };

    const updateWeekNote = (day: Day, value: string) => {
        setCalendar((prev) =>
            prev.map((d) =>
                d.date.toISOString() === day.date.toISOString()
                    ? { ...d, weekNote: value }
                    : d
            )
        );
    };

    /* ===================== UI ===================== */

    return (
        <main style={{ padding: "20px" }}>
            <h1>Study App</h1>

            {/* Monat */}
            <div style={{ marginBottom: "10px" }}>
                <button onClick={() => setCurrentMonth((m) => m - 1)}>◀</button>

                <span style={{ margin: "0 10px" }}>
                    {["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"][currentMonth]}
                </span>

                <button onClick={() => setCurrentMonth((m) => m + 1)}>▶</button>
            </div>

            {/* Print */}
            <button
                onClick={() => window.print()}
                style={{
                    marginBottom: "12px",
                    padding: "6px 12px",
                    background: "#00ff88",
                    color: "black",
                    border: "none",
                }}
            >
                Export / Print
            </button>

            <Heatmap calendar={calendar} currentMonth={currentMonth} />
            <Analytics calendar={calendar} currentMonth={currentMonth} />

            {/* Wochen Summary */}
            {weeks.map((week, i) => (
                <WeekSummary key={i} week={week} index={i} />
            ))}

            {/* GRID */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "12px",
                }}
            >
                {calendar
                    .filter((d) =>
                        ["Montag", "Mittwoch", "Donnerstag", "Sonntag"].includes(d.weekday)
                    )
                    .filter(
                        (d) => new Date(d.date).getMonth() === currentMonth
                    )
                    .map((day, dayIndex) => (
                        <DayCard
                            key={dayIndex}
                            day={day}
                            updateEntry={updateEntry}
                            updateNote={updateNote}
                            updateWeekNote={updateWeekNote}
                        />
                    ))}
            </div>
        </main>
    );
}