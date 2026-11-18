import type { AddoEvent, EventType, Lang } from './event';

/** Reference timezone for "today" and day boundaries (documented in docs/filters.md). */
export const TZ = 'Europe/Rome';

export interface Filters {
  type: EventType | null;
  title: string;
  /** Day as YYYY-MM-DD in TZ; null = any day */
  date: string | null;
}

export const dayOf = (d: Date | string, tz = TZ): string =>
  new Intl.DateTimeFormat('en-CA', {
    timeZone: tz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(typeof d === 'string' ? new Date(d) : d);

/** Injectable clock for tests. */
export const initialFilters = (now: () => Date = () => new Date()): Filters => ({
  type: null,
  title: '',
  date: dayOf(now()),
});

/** An event matches a day if that day falls between its start day and end day (inclusive), so midnight-crossing events match both. */
export function filterEvents(events: AddoEvent[], f: Filters, lang: Lang): AddoEvent[] {
  const q = f.title.trim().toLocaleLowerCase(lang);
  return events.filter(
    (e) =>
      (!f.type || e.type === f.type) &&
      (!q || e.title[lang].toLocaleLowerCase(lang).includes(q)) &&
      (!f.date || (dayOf(e.start) <= f.date && f.date <= dayOf(e.end))),
  );
}
