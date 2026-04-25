import { Day } from "@/types";

const schedule: Record<string, { name: string; time: string }[]> = {
    Montag: [
        { name: "Objektorientierte Skriptsprachen", time: "18–19" },
        { name: "Theoretische Informatik", time: "20–21" },
    ],
    Mittwoch: [
        { name: "IT Sicherheit", time: "18–19" },
        { name: "Bildverarbeitung", time: "20–21" },
        { name: "Softwaretechnik", time: "20:15–21:15" },
    ],
    Donnerstag: [
        { name: "Algorithmen & Datenstrukturen", time: "18–19" },
    ],
    Sonntag: [],
};

const weekdayNames = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
];

export const generateDays = (): Day[] => {
    const start = new Date("2026-03-23");
    const end = new Date("2026-07-19");
    const days: Day[] = [];

    while (start <= end) {
        const weekday = weekdayNames[start.getDay()];
        const weekdayModules = schedule[weekday] || [];

        days.push({
            date: new Date(start),
            weekday,
            weekNote: "",
            entries: weekdayModules.map((m) => ({
                module: m.name,
                time: m.time,
                sprechstunde: false,
                esa: false,
                lernen: false,
                klausur: false,
                note: "",
            })),
        });

        start.setDate(start.getDate() + 1);
    }

    return days;
};