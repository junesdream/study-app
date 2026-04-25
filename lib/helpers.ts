import { Day } from "@/types";

export const getProgress = (day: Day) => {
    const total = day.entries.length * 4;
    if (total === 0) return 0;

    const done = day.entries.reduce((sum, e) => {
        return (
            sum +
            (e.sprechstunde ? 1 : 0) +
            (e.esa ? 1 : 0) +
            (e.lernen ? 1 : 0) +
            (e.klausur ? 1 : 0)
        );
    }, 0);

    return Math.round((done / total) * 100);
};

export const getWeekStats = (weekDays: Day[]) => {
    let total = 0;
    let done = 0;

    weekDays.forEach((day) => {
        day.entries.forEach((e) => {
            total += 4;
            if (e.sprechstunde) done++;
            if (e.esa) done++;
            if (e.lernen) done++;
            if (e.klausur) done++;
        });
    });

    return {
        total,
        done,
        percent: total === 0 ? 0 : Math.round((done / total) * 100),
    };
};

export const buildWeeks = (calendar: Day[], currentMonth: number) => {
    const weeks: Day[][] = [];
    let currentWeek: Day[] = [];

    calendar
        .filter((d) =>
            ["Montag", "Mittwoch", "Donnerstag", "Sonntag"].includes(d.weekday)
        )
        .filter((d) => new Date(d.date).getMonth() === currentMonth)
        .forEach((d) => {
            currentWeek.push(d);

            if (d.weekday === "Sonntag") {
                weeks.push(currentWeek);
                currentWeek = [];
            }
        });

    return weeks;
};