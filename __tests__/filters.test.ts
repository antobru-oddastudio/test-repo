import data from '../src/data/events.json';
import type { AddoEvent } from '../src/domain/event';
import { dayOf, filterEvents, initialFilters } from '../src/domain/filters';

const events = data.events as AddoEvent[];
const base = { type: null, title: '', date: null };
const ids = (f: object, lang: 'it' | 'en' = 'it') =>
  filterEvents(events, { ...base, ...f }, lang).map((e) => e.id);

test('empty criteria return all', () => expect(ids({})).toHaveLength(4));
test('type', () => expect(ids({ type: 'art' })).toEqual(['mostra-luci']));
test('title is case-insensitive in both languages', () => {
  expect(ids({ title: 'JAZZ' })).toEqual(['jazz-in-piazza']);
  expect(ids({ title: 'night of' }, 'en')).toEqual(['notte-dei-sapori']);
  expect(ids({ title: 'night of' }, 'it')).toEqual([]);
});
test('date, with midnight-crossing event matching both days', () => {
  expect(ids({ date: '2026-11-18' })).toEqual(['jazz-in-piazza', 'notte-dei-sapori']);
  expect(ids({ date: '2026-11-19' })).toEqual(['notte-dei-sapori', 'mostra-luci']);
  expect(ids({ date: '2026-11-20' })).toEqual([]);
});
test('combination and zero results', () => {
  expect(ids({ type: 'food', date: '2026-11-19', title: 'notte' })).toEqual(['notte-dei-sapori']);
  expect(ids({ type: 'music', date: '2026-11-19' })).toEqual([]);
});
test('initial date is today in Europe/Rome, with day boundaries', () => {
  expect(initialFilters(() => new Date('2026-11-18T10:00:00+01:00')).date).toBe('2026-11-18');
  expect(dayOf(new Date('2026-11-18T23:30:00Z'))).toBe('2026-11-19'); // 00:30 in Rome
  expect(dayOf(new Date('2026-11-18T22:59:00Z'))).toBe('2026-11-18');
});
