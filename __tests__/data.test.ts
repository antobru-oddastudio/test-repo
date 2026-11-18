import data from '../src/data/events.json';
import { createRepository, eventRepository } from '../src/data/eventRepository';
import type { AddoEvent, EventsFile } from '../src/domain/event';
import { validateEvents } from '../src/domain/validate';
import { formatDateTime } from '../src/lib/format';
import { markerPositions } from '../src/map/types';
import en from '../src/i18n/en';
import it from '../src/i18n/it';
import { pickLang } from '../src/i18n';

jest.mock('expo-localization', () => ({ getLocales: () => [{ languageCode: 'fr' }] }));

const file = data as EventsFile;
const clone = (patch: Partial<AddoEvent>, i = 0): EventsFile => ({
  ...file,
  events: file.events.map((e, j) => (j === i ? { ...e, ...patch } : e)),
});

test('sample data is valid', () => expect(validateEvents(file)).toEqual([]));
test('validator reports event and field', () => {
  expect(validateEvents(clone({ id: 'notte-dei-sapori' }))).toContain(
    'event notte-dei-sapori / id: duplicate',
  );
  expect(validateEvents(clone({ lat: 91 }))[0]).toMatch(/jazz-in-piazza \/ lat/);
  expect(validateEvents(clone({ end: '2026-11-18T10:00:00+01:00' }))[0]).toMatch(/end: before start/);
  expect(validateEvents(clone({ start: '2026-11-18T10:00:00' }))[0]).toMatch(/start: invalid/);
  expect(validateEvents(clone({ title: { it: 'x', en: '' } }))[0]).toMatch(/title.en: missing translation/);
});
test('repository: list, by id, missing; substitute adapter same contract', () => {
  expect(eventRepository.list()).toHaveLength(4);
  expect(eventRepository.getById('mostra-luci')).toMatchObject({ ok: true });
  expect(eventRepository.getById('nope')).toEqual({ ok: false, reason: 'not-found' });
  expect(createRepository([]).getById('x').ok).toBe(false);
});
test('coincident coordinates yield distinct markers', () => {
  const p = markerPositions(file.events);
  expect(new Set(p.map((m) => `${m.lat},${m.lng}`)).size).toBe(p.length);
});
test('translation parity', () => {
  const keys = (o: object, p = ''): string[] =>
    Object.entries(o).flatMap(([k, v]) => (typeof v === 'object' ? keys(v, `${p}${k}.`) : [`${p}${k}`]));
  expect(keys(en)).toEqual(keys(it));
});
test('language fallback and explicit-timezone formatting', () => {
  expect(pickLang('fr')).toBe('it');
  expect(pickLang('en')).toBe('en');
  expect(formatDateTime('2026-11-18T20:00:00+01:00', 'en')).toMatch(/8:00/);
  expect(formatDateTime('2026-11-18T20:00:00+01:00', 'it')).toMatch(/20:00/);
  // Midnight-crossing event end renders on the next day
  expect(formatDateTime('2026-11-19T01:00:00+01:00', 'it')).toMatch(/19/);
});
