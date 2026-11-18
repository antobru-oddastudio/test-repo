import type { AddoEvent } from '../domain/event';
import data from './events.json';

export type EventResult = { ok: true; event: AddoEvent } | { ok: false; reason: 'not-found' };

/** Contract used by screens; replaceable with a remote service. */
export interface EventRepository {
  list(): AddoEvent[];
  getById(id: string): EventResult;
}

export function createRepository(events: AddoEvent[]): EventRepository {
  return {
    list: () => events,
    getById: (id) => {
      const event = events.find((e) => e.id === id);
      return event ? { ok: true, event } : { ok: false, reason: 'not-found' };
    },
  };
}

export const eventRepository = createRepository(data.events as AddoEvent[]);
