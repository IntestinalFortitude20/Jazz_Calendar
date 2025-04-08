export interface EventDate {
    start_date: string;
    start_time: string;
    end_date?: string | null;
    end_time?: string | null;
    original_date: string;
}

export interface Event {
    id?: number;
    event: string;
    venue: string;
    city: string;
    website: string;
    date: EventDate;
}