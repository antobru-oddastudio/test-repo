export type Lang = 'it' | 'en';
export type Localized = Record<Lang, string>;
export const EVENT_TYPES = ['music', 'food', 'art', 'sport'] as const;
export type EventType = (typeof EVENT_TYPES)[number];

export interface AddoEvent {
  id: string;
  type: EventType;
  title: Localized;
  description: Localized;
  venue: Localized;
  organizer: string;
  /** ISO 8601 with explicit offset, e.g. 2026-11-18T20:00:00+01:00 */
  start: string;
  end: string;
  lat: number;
  lng: number;
  poster: string;
  posterAlt: Localized;
}

export interface EventsFile {
  version: number;
  timezone: string;
  events: AddoEvent[];
}
