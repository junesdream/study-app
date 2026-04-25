export type Entry = {
    module: string;
    time: string;
    sprechstunde: boolean;
    esa: boolean;
    lernen: boolean;
    klausur: boolean;
    note: string;
};

export type Day = {
    date: Date;
    weekday: string;
    weekNote: string;
    entries: Entry[];
};