import { Day } from "@/types";

export default function WeekSummary({
                                        week,
                                        index,
                                    }: {
    week: Day[];
    index: number;
}) {
    let total = 0;
    let done = 0;

    week.forEach((day) => {
        day.entries.forEach((e) => {
            total += 4;
            if (e.sprechstunde) done++;
            if (e.esa) done++;
            if (e.lernen) done++;
            if (e.klausur) done++;
        });
    });

    const percent = total === 0 ? 0 : Math.round((done / total) * 100);

    return (
        <div style={{ color: "#00ffaa", marginBottom: "6px" }}>
            Woche {index + 1}: {percent}% ({done}/{total})
        </div>
    );
}